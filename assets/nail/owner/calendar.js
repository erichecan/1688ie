import {staff,services,byId,DEMO_DAY,time,range,dateLabel,addDays} from './data.js';
import {escapeHTML as e,attrs,icon,avatar,button,iconButton,statusIcon,emptyState,select} from './components.js';

export function appointmentCard(a,ctx,{timeline=false}={}) {
  const c=ctx.store.customer(a.customerId)||{name:'Walk-in'},s=byId(services,a.serviceId),p=byId(staff,a.staffId);
  const selected=ctx.ui.drawer?.appointmentId===a.id;
  const html=`<strong>${e(c.name)}</strong><span>${e(s.name)}${timeline?` · ${p.name}`:''}</span><small>${range(a.start,a.duration)}</small>${statusIcon(a.status)}`;
  if(timeline)return `<button class="timeline-card ${p.id} ${a.status}" data-action="appointment" data-id="${e(a.id)}">${html}</button>`;
  return `<button${attrs({class:`appointment ${p.id} ${a.status} ${selected?'selected':''} ${a.duration<=30?'short':''} ${a.duration<=15?'tiny':''}`,'data-action':'appointment','data-id':a.id,'aria-label':`${c.name}, ${s.name}, ${range(a.start,a.duration)}, ${a.status}`,style:`--start:${a.start-540};--duration:${a.duration};--overlap-count:${a.overlapCount||1};--overlap-index:${a.overlapIndex||0}`})}>${html}</button>`;
}
export function openingCard(slot,ctx,{timeline=false}={}) {
  const selected=ctx.ui.drawer?.mode==='new'&&ctx.ui.form.staffId===slot.staffId&&ctx.ui.form.start===slot.start;
  return `<button${attrs({class:`opening ${timeline?'timeline-opening':''} ${selected?'selected':''}`,'data-action':'opening','data-staff':slot.staffId,'data-start':slot.start,'data-duration':slot.duration,style:timeline?'':`--start:${slot.start-540};--duration:${slot.duration}`})}><strong>+ ${slot.duration} min opening</strong><small>${range(slot.start,slot.duration)}${timeline?` · ${byId(staff,slot.staffId).name}`:''}</small></button>`;
}
function dayBar(ctx,appointments,openings) {
  const {ui}=ctx,isToday=ui.date===DEMO_DAY;
  const title=ui.view==='calendar'?'Calendar':isToday?'Today':dateLabel(ui.date,{weekday:'long',month:'long',day:'numeric'});
  const count=ui.preview&&isToday?12:appointments.length;
  return `<div class="day-bar"><div><h1>${e(title)}</h1><p>${ui.preview&&isToday?'Monday, October 5, 2024':dateLabel(ui.date,{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</p></div><div class="day-navigation">${iconButton('left','Previous day','day',{'data-offset':-1})}${button(isToday?'Today':'Back to today',{action:'today',cls:'today-button'})}${iconButton('right','Next day','day',{'data-offset':1})}${ui.view==='calendar'?`<input type="date" aria-label="Choose calendar date" data-input="calendar-date" value="${ui.date}">`:''}</div><div class="day-stats">${count} appointments <span class="stats-dot">·</span> <span>${openings.length} openings</span></div></div>`;
}
function markOverlaps(items) {
  const sorted=items.map(a=>({...a})).sort((a,b)=>a.start-b.start);let group=[],end=-1;
  const finish=()=>{if(group.length>1)group.forEach((a,i)=>{a.overlapCount=group.length;a.overlapIndex=i;});};
  for(const a of sorted){if(a.start>=end){finish();group=[];end=-1;}group.push(a);end=Math.max(end,a.start+a.duration);}finish();return sorted;
}
export function calendarView(ctx) {
  const {store,ui}=ctx;
  const appointments=store.data.appointments.filter(a=>a.date===ui.date&&a.status!=='cancelled');
  const openings=store.openings(ui.date);
  const visibleStaff=ui.staffFilter?.length?staff.filter(s=>ui.staffFilter.includes(s.id)):staff;
  const timeline=[...appointments.map(a=>({start:a.start,type:'appointment',item:a})),...openings.map(s=>({start:s.start,type:'opening',item:s}))].sort((a,b)=>a.start-b.start);
  return `<main class="calendar-page" aria-label="Appointment calendar">${dayBar(ctx,appointments,openings)}<div class="calendar-desktop"><div class="staff-head" data-count="${visibleStaff.length}" style="${visibleStaff.length!==3?`grid-template-columns:var(--rail) repeat(${visibleStaff.length},minmax(0,1fr));`:''}${visibleStaff.length>5?`min-width:calc(var(--rail) + ${visibleStaff.length} * 208px + var(--gutter));`:''}"><div class="rail-head"></div>${visibleStaff.map((p,i)=>`<div class="staff-person">${avatar(p)}<div><strong><i style="background:${p.color}"></i>${p.name}</strong><small>${i===1?'10:00 AM – 7:00 PM':`${time(p.start)} – ${time(p.end)}`}</small></div></div>`).join('')}</div><div class="calendar-scroll" id="calendar-scroll"><div class="calendar-grid" style="--staff-count:${visibleStaff.length};${visibleStaff.length>5?`min-width:calc(var(--rail) + ${visibleStaff.length} * 208px + var(--gutter));`:''}"><div class="time-rail">${Array.from({length:11},(_,i)=>`<span class="hour-label" style="--hour-index:${i}">${i+9>12?i-3:i+9} ${i>=3?'PM':'AM'}</span>`).join('')}</div><div class="staff-lanes">${visibleStaff.map(p=>`<div class="staff-lane" data-lane="${p.id}">${markOverlaps(appointments.filter(a=>a.staffId===p.id)).map(a=>appointmentCard(a,ctx)).join('')}${store.data.blocks.filter(a=>a.date===ui.date&&a.staffId===p.id).map(b=>`<div class="unavailable" style="--start:${b.start-540};--duration:${b.duration}">${icon('lunch')}<span>${e(b.label)}<small>${range(b.start,b.duration)}</small></span></div>`).join('')}${openings.filter(s=>s.staffId===p.id).map(s=>openingCard(s,ctx)).join('')}</div>`).join('')}</div>${ui.date===DEMO_DAY?`<div class="now-line" style="--start:257"><span>1:17 PM</span><i></i></div>`:''}</div></div></div><div class="mobile-timeline">${timeline.length?timeline.map(x=>`<section class="timeline-entry"><div class="timeline-time">${time(x.start)}</div>${x.type==='appointment'?appointmentCard(x.item,ctx,{timeline:true}):openingCard(x.item,ctx,{timeline:true})}</section>`).join(''):emptyState('Your day is open','Add an appointment to get started.',button('+ Add appointment',{action:'new',kind:'primary'}))}</div>${!appointments.length?`<div class="calendar-empty">${emptyState('Your day is open','No appointments on this date.',button('+ Add appointment',{action:'new',kind:'primary'}))}</div>`:''}</main>`;
}
