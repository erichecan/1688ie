import {initialData,byId,staff,services,addDays} from './data.js';
const KEY='lumi-owner-demo-v1';
export function createStore({preview=false}={}) {
  let data=initialData();
  if(!preview) {try {const saved=JSON.parse(localStorage.getItem(KEY)); if(saved?.version===1&&Array.isArray(saved.customers)&&Array.isArray(saved.appointments)&&Array.isArray(saved.blocks)) data=saved;}catch{/* blocked storage uses memory */}}
  let storageAvailable=true;
  const save=()=>{if(preview)return;try{localStorage.setItem(KEY,JSON.stringify(data));}catch{storageAvailable=false;}};
  function records(date,staffId,except) {return [...data.appointments.filter(a=>a.status!=='cancelled'&&a.status!=='no-show'),...data.blocks].filter(a=>a.date===date&&a.staffId===staffId&&a.id!==except);}
  function available(date,staffId,start,duration,except) {
    const person=byId(staff,staffId); if(!person||start<person.start||start+duration>person.end)return false;
    return !records(date,staffId,except).some(a=>start<a.start+a.duration&&start+duration>a.start);
  }
  function slots(date,staffId,duration,except) {const p=byId(staff,staffId);if(!p)return [];const out=[];for(let m=p.start;m+duration<=p.end;m+=30)if(available(date,staffId,m,duration,except))out.push(m);return out;}
  function openings(date) {
    const out=[];
    const preferred=[{staffId:'jessica',start:870,duration:60},{staffId:'mia',start:780,duration:90}];
    for(const slot of preferred)if(available(date,slot.staffId,slot.start,slot.duration))out.push({...slot,date});
    for(const p of staff) {
      const ordered=records(date,p.id).sort((a,b)=>a.start-b.start);let cursor=p.start;
      for(const a of ordered){const gap=a.start-cursor;if(gap>=60&&gap<=120&&cursor>p.start&&!out.some(s=>s.staffId===p.id&&s.start>=cursor&&s.start<a.start))out.push({staffId:p.id,start:cursor,duration:gap,date});cursor=Math.max(cursor,a.start+a.duration);}
    }return out;
  }
  function transact(fn){const result=fn();save();return result;}
  function book(form,{override=false,walkIn=false}={}) {
    const service=byId(services,form.serviceId);
    if(!service||!byId(staff,form.staffId)||!/^\d{4}-\d{2}-\d{2}$/.test(form.date))throw new Error('Choose a service, technician and date.');
    if(!walkIn&&!byId(data.customers,form.customerId))throw new Error('Choose a customer.');
    const start=Number(form.start),person=byId(staff,form.staffId);if(!Number.isFinite(start)||start<person.start||start+service.duration>person.end)throw new Error('Choose a time within this technician’s working hours.');
    if(!override&&!available(form.date,form.staffId,start,service.duration))throw new Error('This time is no longer available. Choose another time.');
    return transact(()=>{const a={id:`a-${crypto.randomUUID()}`,customerId:form.customerId||null,serviceId:service.id,staffId:form.staffId,date:form.date,start,duration:service.duration,price:service.price,status:walkIn?'arrived':'confirmed',deposit:0};data.appointments.push(a);return a;});
  }
  function move(id,form,{override=false}={}) {const a=byId(data.appointments,id);if(!a)throw new Error('Appointment not found.');const person=byId(staff,form.staffId),start=Number(form.start);if(!person||!Number.isFinite(start)||start<person.start||start+a.duration>person.end)throw new Error('Choose a time within this technician’s working hours.');if(!override&&!available(form.date,form.staffId,start,a.duration,id))throw new Error('This time is no longer available. Choose another time.');return transact(()=>Object.assign(a,{date:form.date,staffId:form.staffId,start}));}
  function status(id,status,note=''){const a=byId(data.appointments,id);if(!a)return;return transact(()=>{
    const c=byId(data.customers,a.customerId);if(status==='no-show'&&a.status!=='no-show'&&c)c.noShows++;
    if(status==='completed'&&a.status!=='completed'&&c){c.visits++;c.spent+=a.price;c.last=a.date;c.favorite=a.serviceId;c.staff=a.staffId;}
    a.status=status;if(note)a.cancelNote=note;return a;
  });}
  return {get data(){return data;},get storageAvailable(){return storageAvailable;},available,slots,openings,book,move,status,
    customer:id=>byId(data.customers,id),appointment:id=>byId(data.appointments,id),
    updateCustomer:(id,patch)=>transact(()=>Object.assign(byId(data.customers,id),patch)),
    addCustomer:fields=>transact(()=>{const c={...initialData().customers[0],...fields,id:`c-${crypto.randomUUID()}`,img:'',art:null,visits:0,spent:0,last:null,noShows:0,tag:'New',notes:[],tags:[],preferences:{shape:'',colors:'',sensitive:'',staff:''}};data.customers.push(c);return c;}),
    reset:()=>{data=initialData();save();},
    nextSlot:(date,staffId,duration,except)=>{for(let i=0;i<7;i++){const d=addDays(date,i),choices=slots(d,staffId,duration,except);if(choices.length)return {date:d,start:choices[0]};}return null;},
  };
}
