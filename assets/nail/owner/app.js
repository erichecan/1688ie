import {staff,services,DEMO_DAY,byId,dateLabel,time,range,addDays} from './data.js';
import {createStore} from './store.js';
import {escapeHTML as e,icon,avatar,button,iconButton,searchInput,personRow,modal,field,select,badge,artwork} from './components.js';
import {calendarView} from './calendar.js';
import {customerListView,customerDetailView,filteredCustomers} from './customers.js';
import {renderDrawer} from './drawers.js';
import {translateDOM,translateText} from './i18n.js';

const params=new URLSearchParams(location.search),preview=params.has('preview');
const store=createStore({preview});
const ui={preview,view:'today',date:DEMO_DAY,lang:'en',drawer:null,modal:null,profileOpen:false,globalSearch:'',mobileSearchOpen:false,
 customerId:'lily',customerSearch:'',customerTab:'Appointment history',historyService:'all',filters:{status:'all',last:'all',visits:'all',service:'all'},sort:'name',selectedCustomers:new Set(),filterOpen:false,
 form:{},bookingSearch:'',fromOpening:false,walkIn:false,formError:'',suggestion:null,allowOverride:false,moreActions:false,showMoreTimes:false,dateStripBase:DEMO_DAY,
};
const app=document.getElementById('app'),ctx={ui,store};
let toastTimer,modalReturnFocus=null,drawerReturnFocus=null;
function toast(message){const el=document.getElementById('toast');el.textContent=translateText(message,ui.lang);el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),3500);}
function header() {
  const nav=['today','calendar','customers'];
  const globalResults=ui.globalSearch?store.data.customers.filter(c=>`${c.name} ${c.phone}`.toLowerCase().includes(ui.globalSearch.toLowerCase())).slice(0,4):[];
  return `<header class="global-header"><a class="studio-logo" href="nail-owner-demo.html" aria-label="Lumi Nail Studio — Today">${artwork({src:"assets/nail/owner/art-today.png",width:1501,height:1048,x:36,y:12,w:126,h:54},"studio-wordmark","Lumi Nail Studio")}</a><nav class="main-navigation" aria-label="Main navigation">${nav.map(view=>`<button class="nav-item ${ui.view===view?'active':''}" data-action="navigate" data-view="${view}" ${ui.view===view?'aria-current="page"':''}>${view[0].toUpperCase()+view.slice(1)}</button>`).join('')}</nav><div class="header-tools">${searchInput({id:'globalSearch',value:ui.globalSearch,placeholder:'Search customers...',action:'global-search',cls:'global-search'})}${button('Appointment',{action:'new',kind:'primary',icon:'plus',cls:'header-appointment'})}<button class="profile-button" data-action="profile" aria-label="Studio profile and settings" aria-expanded="${ui.profileOpen}">${avatar(staff[0])}${icon('down')}</button></div>${ui.profileOpen?`<div class="profile-menu">${['Studio settings','Staff','Services','Booking settings'].map(label=>button(label,{action:'settings',data:{'data-section':label}})).join('')}${button('Reports',{action:'reports',icon:'chart'})}${button(ui.lang==='en'?'中文':'English',{action:'language'})}${button('Search customers...',{action:'mobile-search',icon:'search'})}${button('Reset demo data',{action:'reset',icon:'calendar'})}<div class="demo-caption">Demo · fictional records</div></div>`:''}${ui.globalSearch?`<div class="global-search-results">${globalResults.map(c=>personRow(c,{action:'customer',data:{'data-id':c.id},meta:`<small>${e(c.phone)}</small>`})).join('')||'<p class="no-result">No matching customers</p>'}</div>`:''}</header>`;
}
function reports() {
  const revenue=[315,402,586,268,329,410,345],dayLabels=['Thu','Fri','Sat','Sun','Mon','Tue','Wed'];
  const completed=store.data.appointments.filter(a=>a.status==='completed'),today=store.data.appointments.filter(a=>a.date===ui.date&&a.status!=='cancelled');
  return `<main class="reports-page"><h1>Reports</h1><p class="demo-caption">Demo · fictional records</p><div class="report-cards">${[['Revenue',`$${completed.reduce((sum,a)=>sum+a.price,0)}`],['Appointments',today.length],['Customers',store.data.customers.length],['No-shows',store.data.customers.reduce((sum,c)=>sum+c.noShows,0)]].map(([label,value])=>`<div class="report-card">${label}<strong>${value}</strong></div>`).join('')}</div><div class="report-grid"><section class="report-card"><h3>Revenue, last 7 days</h3><div class="report-chart">${revenue.map((v,i)=>`<div class="report-bar" style="height:${v/600*220}px"><small>$${v}</small><span>${dayLabels[i]}</span></div>`).join('')}</div></section><div><section class="report-card"><h3>Service mix</h3>${services.map(s=>`<div class="report-mix-row"><span>${s.name}</span><strong>${completed.filter(a=>a.serviceId===s.id).length}</strong></div>`).join('')}</section><section class="report-card"><h3>By technician</h3>${staff.map(p=>`<div class="report-mix-row"><span>${p.name}</span><strong>$${completed.filter(a=>a.staffId===p.id).reduce((sum,a)=>sum+a.price,0)}</strong></div>`).join('')}</section></div></div></main>`;
}
function destructiveModal(kind) {
  const a=store.appointment(ui.drawer?.appointmentId);if(!a)return '';
  const c=store.customer(a.customerId)||{name:'this customer'},cancel=kind==='cancel';
  const body=cancel?`<p>This appointment with ${e(c.name)} will be cancelled.<br>You can add a note (optional).</p><label class="cancel-note"><textarea id="cancelNote" maxlength="200" placeholder="Add a note (optional)..." aria-label="Cancellation note"></textarea><small id="cancelCount">0/200</small></label>`:`<p>${e(c.name.split(' ')[0])} will be marked as no-show and this will be<br>added to ${e(c.name.split(' ')[0])}'s appointment history.</p><div class="deposit-note">${icon('calendar')}<span>${a.deposit?`$${a.deposit} deposit is recorded. Retention follows your studio policy; this demo does not move money.`:'No deposit was paid for this appointment.<br>You can still mark this as no-show.'}</span></div>`;
  return modal(cancel?'Cancel this appointment?':`Mark ${c.name} as no-show?`,body,`${button('Keep appointment',{action:'close-modal'})}${button(cancel?'Cancel appointment':'Mark as no-show',{action:'confirm-destructive',kind:'danger',data:{'data-kind':kind}})}`,{cls:'confirmation-modal',symbol:cancel?'calendar':'alert'});
}
function editModal(kind) {
  const c=store.customer(ui.modal.customerId||ui.customerId)||{};
  const create=kind==='add-customer',contact=create||kind==='edit-contact';
  const fields=contact?`${field('Name','name',create?'':c.name,{required:true,maxLength:80})}${field('Phone','phone',create?'':c.phone,{type:'tel',required:true,maxLength:32})}${field('Email (optional)','email',create?'':c.email,{type:'email',maxLength:120})}`:kind==='edit-notes'?`<label class="field">One note per line<textarea name="notes" maxlength="2000">${e(c.notes.join('\n'))}</textarea></label>`:kind==='edit-tags'?field('Separate tags with commas','tags',c.tags.join(', '),{maxLength:300}):`${field('Nail shape','shape',c.preferences.shape,{maxLength:100})}${field('Preferred colors','colors',c.preferences.colors,{maxLength:150})}${field('Avoid / Sensitive','sensitive',c.preferences.sensitive,{maxLength:150})}${field('Preferred technician','staff',c.preferences.staff,{maxLength:80})}`;
  const title=create?'Add customer':contact?'Edit customer':kind==='edit-notes'?'Edit notes':kind==='edit-tags'?'Edit tags':'Edit preferences';
  return modal(title,`<form id="customerEdit" novalidate>${fields}<p class="form-message" id="editError" role="alert"></p></form>`,`${button('Cancel',{action:'close-modal'})}${button(create?'Save customer':'Save',{type:'submit',form:'customerEdit',kind:'primary'})}`,{cls:'edit-modal',symbol:''});
}
function settingsModal() {
  const section=ui.modal.section;
  const content=section==='Staff'?staff.map(p=>`<div class="report-mix-row">${avatar(p)}<strong>${p.name}</strong><span>${time(p.start)} – ${time(p.end)}</span></div>`).join(''):section==='Services'?services.map(s=>`<div class="report-mix-row"><strong>${s.name}</strong><span>${s.duration} min · $${s.price}</span></div>`).join(''):section==='Booking settings'?'<p>30-minute time slots · 9 AM–7 PM<br>Deposits are optional. This demo has no payment connection.</p>':'<p>Lumi Nail Studio<br>This is a local demo. No messages or payments are sent.</p>';
  return modal(section,content,button('Close',{action:'close-modal'}),{cls:'edit-modal',symbol:''});
}
function renderModal(){if(!ui.modal)return '';const k=ui.modal.kind;if(['cancel','no-show'].includes(k))return destructiveModal(k);if(k==='reset')return modal('Reset demo data?','<p>Your local changes will be replaced with the original fictional records.</p>',`${button('Keep changes',{action:'close-modal'})}${button('Reset demo data',{action:'confirm-reset',kind:'primary'})}`,{symbol:'calendar'});if(k==='overbook')return modal('Book over this appointment?','<p>This technician already has a booking during this time.<br>The appointments will overlap.</p>',`${button('Choose another time',{action:'close-modal'})}${button('Book anyway',{action:'confirm-overbook',kind:'danger'})}`);if(k==='settings')return settingsModal();return editModal(k);}
function render({focus,restoreScroll=true}={}) {
  const oldCalendar=document.getElementById('calendar-scroll'),calendarTop=oldCalendar?.scrollTop||0,calendarLeft=oldCalendar?.scrollLeft||0;
  const drawerTop=document.querySelector('.drawer-scroll')?.scrollTop||0,sidebarTop=document.querySelector('.customer-sidebar')?.scrollTop||0,profileTop=document.querySelector('.customer-profile')?.scrollTop||0;
  const view=ui.view==='customers'?(ui.customerId?customerDetailView(ctx):customerListView(ctx)):ui.view==='reports'?reports():calendarView(ctx);
  app.innerHTML=`<div class="shell ${ui.drawer?'has-drawer':''} ${ui.drawer?.mode==='detail'?'drawer-detail':''} ${ui.mobileSearchOpen?'mobile-search-open':''}" data-view="${ui.view}">${header()}${view}${renderDrawer(ctx)}</div>${renderModal()}`;
  document.documentElement.lang=ui.lang;translateDOM(app,ui.lang);
  const mobileDrawer=ui.drawer&&matchMedia('(max-width:767px)').matches;
  document.body.style.overflow=ui.modal||mobileDrawer?'hidden':'';
  if(mobileDrawer){app.querySelector('.global-header').inert=true;app.querySelector('.shell>main').inert=true;const panel=app.querySelector('.drawer');panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');}
  if(restoreScroll){const cal=document.getElementById('calendar-scroll');if(cal){cal.scrollTop=calendarTop;cal.scrollLeft=calendarLeft;}const dr=document.querySelector('.drawer-scroll');if(dr)dr.scrollTop=drawerTop;const sb=document.querySelector('.customer-sidebar');if(sb)sb.scrollTop=sidebarTop;const cp=document.querySelector('.customer-profile');if(cp)cp.scrollTop=profileTop;}
  if(ui.modal){const overlay=app.querySelector('.modal-overlay');app.querySelector('.shell').inert=true;const target=focus?document.getElementById(focus):overlay.querySelector('input,textarea')||overlay.querySelector('[data-action="close-modal"]');target?.focus({preventScroll:true});}
  else if(focus)document.getElementById(focus)?.focus({preventScroll:true});
}
function rerenderInput(input){const id=input.id,pos=input.selectionStart;render({focus:id});const next=document.getElementById(id);if(next&&pos!=null&&next.type!=='date')try{next.setSelectionRange(pos,pos);}catch{/* search input may not support selection */}}
function openModal(kind,extra={}){modalReturnFocus=document.activeElement;ui.modal={kind,...extra};render();}
function closeModal(){ui.modal=null;render();restoreFocus(modalReturnFocus);modalReturnFocus=null;}
function restoreFocus(el){if(!el)return;const action=el.dataset?.action,id=el.dataset?.id;const target=[...app.querySelectorAll('[data-action]')].find(x=>x.dataset.action===action&&(!id||x.dataset.id===id));target?.focus({preventScroll:true});}
function openDetail(id){if(!store.appointment(id))return;drawerReturnFocus=document.activeElement;ui.drawer={mode:'detail',appointmentId:id};ui.moreActions=false;ui.profileOpen=false;ui.formError='';render();document.querySelector('.drawer-close')?.focus({preventScroll:true});}
function clearFormError(){ui.formError='';ui.suggestion=null;ui.allowOverride=false;}
function openNew({customerId=null,staffId='jessica',start=870,capacity=null,fromOpening=false}={}) {
  drawerReturnFocus=document.activeElement;const c=store.customer(customerId);ui.form={customerId,serviceId:c?.favorite||null,staffId:c?.staff||staffId,date:ui.date,start,capacity};ui.bookingSearch=c?.name||'';ui.fromOpening=fromOpening;ui.walkIn=false;ui.drawer={mode:'new'};ui.profileOpen=false;clearFormError();render();document.getElementById('bookingSearch')?.focus({preventScroll:true});
}
function beginReschedule(){const a=store.appointment(ui.drawer?.appointmentId);if(!a)return;ui.form={...a};const suggestion=store.nextSlot(a.date,a.staffId,a.duration,a.id);if(suggestion)Object.assign(ui.form,suggestion);ui.drawer.mode='reschedule';ui.dateStripBase=ui.date;clearFormError();render();document.querySelector('.drawer-close')?.focus({preventScroll:true});}
function submitAppointment(override=false) {
  try {const moving=ui.drawer.mode==='reschedule',a=moving?store.move(ui.drawer.appointmentId,ui.form,{override}):store.book(ui.form,{override,walkIn:ui.walkIn});ui.date=a.date;ui.modal=null;ui.drawer={mode:'detail',appointmentId:a.id};ui.moreActions=false;clearFormError();render();toast(moving?'Appointment rescheduled.':ui.walkIn?'Service started.':'Appointment booked.');}
  catch(error){ui.modal=null;ui.formError=error.message;const a=store.appointment(ui.drawer?.appointmentId),duration=ui.drawer.mode==='reschedule'?a.duration:byId(services,ui.form.serviceId)?.duration||60;ui.suggestion=store.nextSlot(ui.form.date,ui.form.staffId,duration,ui.drawer.mode==='reschedule'?a.id:null);ui.allowOverride=true;render();document.querySelector('.form-error')?.scrollIntoView({block:'nearest'});}
}
function openCustomer(id){ui.view='customers';ui.customerId=id;ui.drawer=null;ui.globalSearch='';ui.mobileSearchOpen=false;ui.profileOpen=false;ui.customerTab='Appointment history';render({restoreScroll:false});}
function saveCustomer(form) {
  const fields=Object.fromEntries(new FormData(form)),kind=ui.modal.kind,c=store.customer(ui.modal.customerId||ui.customerId);
  const error=document.getElementById('editError');
  if(['add-customer','edit-contact'].includes(kind)){
    const name=fields.name.trim(),phone=fields.phone.trim(),email=fields.email.trim();
    if(!name){error.textContent=translateText('Enter a customer name.',ui.lang);form.elements.name.focus();return;}
    if(phone.replace(/\D/g,'').length<7){error.textContent=translateText('Enter a valid phone number (at least 7 digits).',ui.lang);form.elements.phone.focus();return;}
    if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){error.textContent=translateText('Enter a valid email address.',ui.lang);form.elements.email.focus();return;}
    if(kind==='add-customer'){const added=store.addCustomer({name,phone,email});if(ui.drawer?.mode==='new'){ui.form.customerId=added.id;ui.bookingSearch=added.name;}else ui.customerSearch='';}
    else store.updateCustomer(c.id,{name,phone,email});
  }else if(kind==='edit-notes')store.updateCustomer(c.id,{notes:fields.notes.split('\n').map(s=>s.trim()).filter(Boolean)});
  else if(kind==='edit-tags')store.updateCustomer(c.id,{tags:[...new Set(fields.tags.split(',').map(s=>s.trim()).filter(Boolean))]});
  else store.updateCustomer(c.id,{preferences:fields});
  closeModal();toast('Customer saved.');
}
app.addEventListener('click',event=>{
  const el=event.target.closest('[data-action]');
  if(!el){const lane=event.target.closest('[data-lane]');if(lane&&!event.target.closest('button,.unavailable')){const pos=event.clientY-lane.getBoundingClientRect().top,hour=parseFloat(getComputedStyle(lane).getPropertyValue('--hour')),start=540+Math.floor(pos/hour*2)*30;if(store.available(ui.date,lane.dataset.lane,start,30))openNew({staffId:lane.dataset.lane,start,fromOpening:true});else toast('This time is already booked. Choose a highlighted opening.');}return;}
  if(el.disabled)return;const a=el.dataset.action,d=el.dataset;
  if(a==='modal-backdrop'){if(event.target===el)closeModal();return;}
  if(a==='navigate'){ui.view=d.view;ui.drawer=null;ui.profileOpen=false;ui.customerId=null;ui.globalSearch='';if(d.view==='today')ui.date=DEMO_DAY;render({restoreScroll:false});return;}
  if(a==='profile'){ui.profileOpen=!ui.profileOpen;render();return;}
  if(a==='language'){ui.lang=ui.lang==='en'?'zh':'en';ui.profileOpen=false;render();return;}
  if(a==='reports'){ui.view='reports';ui.drawer=null;ui.profileOpen=false;render();return;}
  if(a==='settings'){ui.profileOpen=false;openModal('settings',{section:d.section});return;}
  if(a==='reset'){ui.profileOpen=false;openModal('reset');return;}
  if(a==='confirm-reset'){store.reset();ui.modal=null;ui.drawer=null;ui.date=DEMO_DAY;ui.view='today';ui.customerSearch='';render({restoreScroll:false});toast('Demo data reset.');return;}
  if(a==='mobile-search'){ui.profileOpen=false;ui.mobileSearchOpen=true;render();document.getElementById('globalSearch').focus();return;}
  if(a==='appointment'){openDetail(d.id);return;}
  if(a==='new'){openNew();return;}
  if(a==='opening'){openNew({staffId:d.staff,start:Number(d.start),capacity:Number(d.duration),fromOpening:true});return;}
  if(a==='book-customer'){openNew({customerId:d.id});return;}
  if(a==='close-drawer'){ui.drawer=null;clearFormError();render();restoreFocus(drawerReturnFocus);return;}
  if(a==='advance'){const current=store.appointment(ui.drawer.appointmentId);store.status(current.id,current.status==='arrived'?'completed':'arrived');render();toast(current.status==='completed'?'Appointment completed.':'Customer marked as arrived.');return;}
  if(a==='more-actions'){ui.moreActions=!ui.moreActions;render();return;}
  if(a==='reschedule'||a==='edit-appointment-staff'){beginReschedule();return;}
  if(a==='appointment-price'){toast('Service price is configured in Profile → Services.');return;}
  if(a==='cancel'||a==='no-show'){openModal(a);return;}
  if(a==='close-modal'){closeModal();return;}
  if(a==='confirm-destructive'){const id=ui.drawer.appointmentId,note=document.getElementById('cancelNote')?.value||'';store.status(id,d.kind==='cancel'?'cancelled':'no-show',note);ui.modal=null;ui.drawer=null;render();toast(d.kind==='cancel'?'Appointment cancelled.':'No-show recorded in customer history.');return;}
  if(a==='day'||a==='today'){ui.date=a==='today'?DEMO_DAY:addDays(ui.date,Number(d.offset));ui.drawer=null;render({restoreScroll:false});return;}
  if(a==='select-customer'){const c=store.customer(d.id);ui.form.customerId=c.id;ui.form.serviceId=c.favorite;if(!ui.fromOpening)ui.form.staffId=c.staff;clearFormError();render();return;}
  if(a==='select-service'){ui.form.serviceId=d.service;clearFormError();const s=byId(services,d.service);if(!store.available(ui.form.date,ui.form.staffId,ui.form.start,s.duration)){ui.formError=`${s.name} needs ${s.duration} minutes. ${byId(staff,ui.form.staffId).name} is already booked during this time.`;ui.suggestion=store.nextSlot(ui.form.date,ui.form.staffId,s.duration);ui.allowOverride=true;}render();return;}
  if(a==='form-date'){ui.form.date=d.date;clearFormError();render();return;}
  if(a==='form-time'){ui.form.date=d.date;ui.form.start=Number(d.start);clearFormError();render();return;}
  if(a==='date-strip'){ui.dateStripBase=addDays(ui.dateStripBase,Number(d.offset));render();return;}
  if(a==='show-times'){ui.showMoreTimes=!ui.showMoreTimes;render();return;}
  if(a==='booking-mode'){ui.walkIn=d.mode==='walk-in';if(ui.walkIn){ui.form.start=797;ui.form.serviceId||='gel';}clearFormError();render();return;}
  if(a==='submit-booking'||a==='submit-reschedule'){submitAppointment();return;}
  if(a==='use-suggestion'){Object.assign(ui.form,ui.suggestion);clearFormError();render();return;}
  if(a==='request-overbook'){openModal('overbook');return;}
  if(a==='confirm-overbook'){submitAppointment(true);return;}
  if(a==='customers'){ui.view='customers';ui.customerId=null;ui.drawer=null;render({restoreScroll:false});return;}
  if(a==='customer'||a==='customer-history'){openCustomer(d.id);return;}
  if(a==='customer-actions'||a==='edit-contact'){openModal('edit-contact',{customerId:d.id});return;}
  if(a==='add-customer'||a==='edit-notes'||a==='edit-preferences'||a==='edit-tags'){openModal(a,{customerId:d.id||ui.customerId});return;}
  if(a==='filter'){ui.filters[d.key]=d.value;render();return;}
  if(a==='toggle-filters'){ui.filterOpen=!ui.filterOpen;render();return;}
  if(a==='clear-filters'){ui.filters={status:'all',last:'all',visits:'all',service:'all'};ui.customerSearch='';render();return;}
  if(a==='sort-customers'){ui.sort=d.sort;render();return;}
  if(a==='customer-tab'){ui.customerTab=d.tab;render();return;}
  if(a==='sms'){toast('SMS demo only — no message was sent.');return;}
});
app.addEventListener('input',event=>{
  const el=event.target,key=el.dataset.input;if(el.id==='cancelNote'){document.getElementById('cancelCount').textContent=`${el.value.length}/200`;return;}
  if(key==='global-search'){ui.globalSearch=el.value;rerenderInput(el);}
  if(key==='customer-search'){ui.customerSearch=el.value;rerenderInput(el);}
  if(key==='booking-search'){ui.bookingSearch=el.value;if(!store.customer(ui.form.customerId)?.name.toLowerCase().includes(el.value.toLowerCase()))ui.form.customerId=null;rerenderInput(el);}
});
app.addEventListener('change',event=>{
  const el=event.target,key=el.dataset.input;
  if(key==='calendar-date'){ui.date=el.value||DEMO_DAY;ui.drawer=null;render({restoreScroll:false});}
  if(key==='form-staff'){ui.form.staffId=el.value;clearFormError();render();}
  if(key==='form-date'){ui.form.date=el.value||ui.date;clearFormError();render();}
  if(key==='service-filter'){ui.filters.service=el.value;render();}
  if(key==='history-service'){ui.historyService=el.value;render();}
  if(key==='select-customer'){el.checked?ui.selectedCustomers.add(el.dataset.id):ui.selectedCustomers.delete(el.dataset.id);}
  if(key==='select-all'){for(const c of filteredCustomers(ctx))el.checked?ui.selectedCustomers.add(c.id):ui.selectedCustomers.delete(c.id);render();}
});
app.addEventListener('submit',event=>{if(event.target.id==='customerEdit'){event.preventDefault();saveCustomer(event.target);}});
app.addEventListener('scroll',event=>{if(event.target.id!=='calendar-scroll')return;const head=app.querySelector('.staff-head');if(Number(head?.dataset.count)>5){head.style.transform=`translateX(${-event.target.scrollLeft}px)`;head.firstElementChild.style.transform=`translateX(${event.target.scrollLeft}px)`;}},true);
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){if(ui.modal)closeModal();else if(ui.drawer){ui.drawer=null;render();restoreFocus(drawerReturnFocus);}else if(ui.profileOpen||ui.globalSearch){ui.profileOpen=false;ui.globalSearch='';render();}}
  if(event.key==='Tab'&&(ui.modal||(ui.drawer&&matchMedia('(max-width:767px)').matches))){const scope=app.querySelector(ui.modal?'.modal':'.drawer'),items=[...scope.querySelectorAll('button:not(:disabled),input,select,textarea,a[href]')].filter(el=>el.getClientRects().length);const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
});
function initPreview() {
  const state=params.get('preview')||params.get('view');
  if(['customers','customer'].includes(state)){ui.view='customers';ui.customerId=state==='customer'?'lily':null;}
  if(['detail','reschedule','cancel','no-show'].includes(state)){ui.drawer={mode:state==='reschedule'?'reschedule':'detail',appointmentId:'a-chloe'};ui.moreActions=['cancel','no-show'].includes(state);ui.form={...store.appointment('a-chloe'),start:930};if(ui.moreActions)ui.modal={kind:state};}
  if(state==='new'){ui.drawer={mode:'new'};ui.form={customerId:'lily',serviceId:'gel',staffId:'jessica',date:DEMO_DAY,start:870,capacity:60};ui.bookingSearch='Lily';ui.fromOpening=true;}
  if(state==='calendar')ui.view='calendar';
}
initPreview();render({restoreScroll:false});if(ui.preview)document.activeElement?.blur();
// Only live views auto-locate. Visual snapshots pin the time and scroll position.
if(!preview&&matchMedia('(min-width:768px) and (max-width:1280px)').matches){const cal=document.getElementById('calendar-scroll');if(cal)cal.scrollTop=(797-540-60)*88/60;}
