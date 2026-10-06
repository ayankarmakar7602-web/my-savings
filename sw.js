const CACHE='my-savings-v3';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
self.addEventListener('push',e=>{
  let data={title:'My Savings',body:'💸 আজ ₹15 জমা দে ভাই 😎'};
  try{if(e.data)data={...data,...e.data.json()};}catch(_){}
  e.waitUntil(self.registration.showNotification(data.title,{
    body:data.body,
    icon:'icon.svg',
    badge:'icon.svg',
    tag:'my-savings',
    data:{url:'./'}
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs)if('focus' in c)return c.focus();
    return clients.openWindow('./');
  }));
});
