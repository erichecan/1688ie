/** Shared fixture and date math. All people and records are fictional. */
export const DEMO_DAY = '2024-10-05';
export const staff = [
  {id:'jessica',name:'Jessica',img:'assets/nail/staff/s4.webp',start:540,end:1080,color:'#ff6b72'},
  {id:'amy',name:'Amy',img:'assets/nail/staff/s2.webp',start:540,end:1140,color:'#a16bff'},
  {id:'mia',name:'Mia',img:'assets/nail/staff/s3.webp',start:540,end:1020,color:'#5799ff'},
];
staff.forEach((p,i)=>p.art={src:'assets/nail/owner/art-today.png',width:1501,height:1048,x:[158,606,1051][i],y:189,w:50,h:50});
export const services = [
  {id:'gel',name:'Gel Manicure',zh:'光疗美甲',duration:60,price:55,img:'assets/nail/svc-gel.webp'},
  {id:'acrylic',name:'Acrylic Full Set',zh:'全套延长甲',duration:90,price:90,img:'assets/nail/svc-basic.webp'},
  {id:'art',name:'Nail Art',zh:'美甲彩绘',duration:75,price:75,img:'assets/nail/svc-art.webp'},
  {id:'pedicure',name:'Pedicure',zh:'足部护理',duration:60,price:60,img:'assets/nail/gallery/g4.webp'},
];
services.forEach((s,i)=>s.art={src:'assets/nail/owner/art-new.png',width:1501,height:1048,x:1119,y:[638,692,748,803][i],w:44,h:38});
const rows = [
  ['lily','Lily Chen','416 555 1234',8,'2024-09-21','gel','Short almond shape','Likes nude colors','VIP',4],
  ['emma','Emma Davis','647 555 8899',6,'2024-09-18','acrylic','Nail art','Usually books with Amy','',2],
  ['olivia','Olivia Park','416 555 2277',4,'2024-09-10','art','Seasonal designs','Prefers weekends','',3],
  ['sophia','Sophia Patel','647 555 3344',1,'2024-09-05','pedicure','Sensitive skin','Prefers quiet time','New',4],
  ['grace','Grace Liu','416 555 7788',7,'2024-08-28','gel','Cat eye styles','Usually books with Mia','',2],
  ['mia-j','Mia Johnson','647 555 9911',3,'2024-08-20','gel','Short nails','Neutral colors','',0],
  ['isabella','Isabella Lee','416 555 4422',5,'2024-08-18','art','Bridal nails in Oct','Likes glitter','',3],
  ['emily','Emily Clark','647 555 6677',4,'2024-08-10','acrylic','Prefers Jessica','Long almond shape','',2],
  ['charlotte','Charlotte Brown','416 555 8800',9,'2024-07-30','pedicure','Regular pedicure','Usually every 6 weeks','',4],
  ['hannah','Hannah Wilson','647 555 2266',3,'2024-07-22','gel','Minimal design','Prefers weekday mornings','',3],
  ['ava','Ava Thompson','416 555 1199',2,'2024-07-22','acrylic','First time acrylic','Likes pink tones','',0],
  ['chloe','Chloe Wang','647 555 7755',11,'2024-07-08','gel','VIP customer','Usually books with Jessica','',4],
  ['ava-m','Ava Martinez','647 555 8822',5,'2024-09-01','acrylic','','','',2],
  ['sophia-k','Sophia Kim','416 555 3345',4,'2024-09-02','acrylic','','','',4],
  ['lily-li','Lily Li','647 555 8899',2,'2024-08-10','gel','','','',0],
];
function historyFor(c) {
  const specs = c.id==='lily' ? [
    ['2024-09-21','gel','jessica',780],['2024-08-18','gel','jessica',870],
    ['2024-07-10','art','amy',900],['2024-06-15','acrylic','jessica',810],
    ['2024-05-12','gel','mia',660],['2024-04-06','pedicure','amy',840],
    ['2024-03-02','gel','jessica',780],['2024-01-20','gel','jessica',900],
  ] : [[c.last,c.favorite,c.staff,780]];
  return specs.map(([date,serviceId,staffId,start],i)=>({id:`history-${c.id}-${i}`,customerId:c.id,date,serviceId,staffId,start,duration:services.find(s=>s.id===serviceId).duration,status:'completed',price:services.find(s=>s.id===serviceId).price}));
}
export function initialData() {
  const customers = rows.map(([id,name,phone,visits,last,favorite,note1,note2,tag,img])=>({
    id,name,phone,visits,last,favorite,notes:[note1,note2].filter(Boolean),tag,
    img:img?`assets/nail/staff/s${img}.webp`:'',email:`${name.toLowerCase().replaceAll(' ','.')}@email.com`,
    spent:id==='lily'?420:visits*55,noShows:0,staff:id==='emma'?'amy':id==='grace'?'mia':'jessica',
    preferences:{shape:'Short almond',colors:'Nude / neutral, cat eye',sensitive:'Sensitive cuticles (be gentle)',staff:'Jessica'},
    tags:id==='lily'?['VIP','Regular','Nude colors','Cat eye','Sensitive cuticles','Prefers quiet time']:[],
  }));
  customers[0].notes=['Short almond shape','Usually likes nude colors','Sensitive cuticles','Prefers quiet time','Loves cat eye styles'];
  customers.forEach((c,i)=>{if(i<12&&c.img)c.art={src:'assets/nail/owner/art-customers.png',width:1500,height:1049,x:389,y:[236,298,361,427,489,555,621,688,754,820,887,954][i],w:46,h:46};});
  customers[0].art={src:'assets/nail/owner/art-customer-detail.png',width:1500,height:1049,x:406,y:130,w:137,h:137};
  customers.find(c=>c.id==='ava-m').art=customers[1].art;
  customers.find(c=>c.id==='sophia-k').art=customers[3].art;
  const specs=[
    ['a-lily','lily','jessica','gel',540,60,'confirmed'],['a-olivia','olivia','jessica','art',630,60,'booked'],
    ['a-chloe','chloe','jessica','gel',780,60,'confirmed'],['a-sophia-k','sophia-k','jessica','acrylic',960,90,'confirmed'],
    ['a-emma','emma','amy','gel',570,60,'confirmed'],['a-ava','ava-m','amy','acrylic',660,90,'confirmed'],
    ['a-mia','mia-j','amy','gel',780,60,'booked'],['a-isabella','isabella','amy','art',870,60,'confirmed'],
    ['a-charlotte','charlotte','amy','pedicure',960,60,'confirmed'],['a-sophia','sophia','mia','pedicure',600,60,'confirmed'],
    ['a-grace','grace','mia','gel',690,60,'confirmed'],['a-emily','emily','mia','acrylic',900,60,'booked'],
    ['a-hannah','hannah','mia','gel',990,30,'confirmed'],
  ];
  const appointments=specs.map(([id,customerId,staffId,serviceId,start,duration,status])=>({id,customerId,staffId,serviceId,start,duration,status,date:DEMO_DAY,price:services.find(s=>s.id===serviceId).price,deposit:0}));
  return {version:1,customers,appointments:[...appointments,...customers.flatMap(historyFor)],blocks:[{id:'lunch',staffId:'jessica',date:DEMO_DAY,start:720,duration:30,label:'Lunch'}]};
}
export const byId = (list,id)=>list.find(item=>item.id===id);
export function time(min,withPeriod=true) { const hour=Math.floor(min/60); return `${hour%12||12}:${String(min%60).padStart(2,'0')}${withPeriod?` ${hour>=12?'PM':'AM'}`:''}`; }
export function range(start,duration) { return `${time(start,false)} – ${time(start+duration)}`; }
export function addDays(date,count) {const d=new Date(`${date}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+count);return d.toISOString().slice(0,10);}
export function dateLabel(date,options={month:'short',day:'numeric',year:'numeric'}) {return new Intl.DateTimeFormat('en-US',{...options,timeZone:'UTC'}).format(new Date(`${date}T12:00:00Z`));}
export function daysSince(date,from=DEMO_DAY) {return Math.floor((new Date(`${from}T12:00:00Z`)-new Date(`${date}T12:00:00Z`))/86400000);}
