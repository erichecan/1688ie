/** One dictionary for shared UI; records and names remain locale independent. */
const zh={
 Today:'今日',Calendar:'日历',Customers:'客户',Appointment:'预约','Add customer':'新增客户',
 'Book appointment':'确认预约','Book':'预约','Back to customers':'返回客户列表','Back to today':'返回今日',
 'New appointment':'新建预约','Reschedule appointment':'预约改期','Reschedule':'改期','More actions':'更多操作',
 'Mark arrived':'标记到店','Complete appointment':'完成服务','Cancel appointment':'取消预约','Mark as no-show':'标记爽约',
 'Keep appointment':'保留预约','Close panel':'关闭面板','Close dialog':'关闭对话框','SMS customer':'联系客户',
 'Customer':'客户','Service':'服务','Confirm':'确认','Confirm details':'确认信息','Current appointment':'当前预约',
 'Choose a new date':'选择新日期','Usually books':'常用项目','Most recent':'最近预约','Popular services':'热门服务',
 'Add new customer':'新增客户','Search name or phone...':'搜索姓名或电话…','Search customers...':'搜索客户…',
 'Show more times':'显示更多时间','Show fewer times':'收起时间','Status':'状态','All customers':'全部客户',
 Active:'活跃',New:'新客户','At risk (no visit 3+ months)':'超过3个月未到访','No-shows':'爽约',
 'Last visit':'最近到访','Any time':'不限时间','Last 30 days':'最近30天','Last 3 months':'最近3个月',
 'Last 6 months':'最近6个月','More than 6 months':'超过6个月','Total visits':'到访次数',Any:'不限',
 '1 visit':'1次','2–5 visits':'2–5次','6–10 visits':'6–10次','11+ visits':'11次以上','Favorite service':'偏好项目',
 'All services':'全部服务','Notes':'备注','Preferences':'偏好','Tags':'标签','Photos':'照片','Edit':'编辑',
 'Appointment history':'预约历史','Phone':'电话','Total spent':'累计消费','Customer since':'成为客户',
 'Nail shape':'甲型','Preferred colors':'偏好颜色','Avoid / Sensitive':'敏感与注意事项','Preferred technician':'常用技师',
 'Add tag':'新增标签','Upcoming':'后续预约','Past visits':'历史到访','View all':'查看全部',
 Confirmed:'已确认',Booked:'已预约',Arrived:'已到店',Completed:'已完成',Cancelled:'已取消','No-show':'爽约',
 'Gel Manicure':'光疗美甲','Acrylic Full Set':'全套延长甲','Nail Art':'美甲彩绘',Pedicure:'足部护理',
 'Studio settings':'门店设置',Staff:'技师',Services:'服务项目','Booking settings':'预约设置','Reports':'报表',
 'Reset demo data':'重置演示数据','Demo · fictional records':'演示 · 全部数据虚构','Owner demo':'老板端演示',
 'Save customer':'保存客户',Save:'保存',Cancel:'取消','Name':'姓名',Email:'邮箱','Email (optional)':'邮箱（选填）',
 'Edit customer':'编辑客户','Edit notes':'编辑备注','Edit preferences':'编辑偏好','Edit tags':'编辑标签',
 'One note per line':'每行一条备注','Separate tags with commas':'用逗号分隔标签',
 'Choose another time':'选择其他时间','Book anyway':'仍然预约','Technician':'技师',Date:'日期',
 'Date & time':'日期和时间','Walk-in':'到店即做','Start service':'开始服务','Customer (optional)':'客户（选填）',
 'Technician · Start now':'技师 · 立即开始','No matching customers':'没有匹配客户','Clear filters':'清除筛选',
 'Your day is open':'当天暂无预约','Add an appointment to get started.':'添加预约即可开始。',
 'No appointments yet':'暂无预约','No notes yet':'暂无备注','No photos yet':'暂无照片','No past visits':'暂无历史到访',
 'No upcoming appointments':'暂无后续预约','Not set':'未设置',Lunch:'午休','Filters':'筛选',
 'Short almond shape':'短杏仁甲型','Usually likes nude colors':'通常喜欢裸色','Likes nude colors':'喜欢裸色',
 'Sensitive cuticles':'甲周皮肤敏感','Prefers quiet time':'喜欢安静','Loves cat eye styles':'喜欢猫眼款式',
 'Short almond':'短杏仁形','Nude / neutral, cat eye':'裸色 / 中性色、猫眼','Sensitive cuticles (be gentle)':'甲周皮肤敏感（轻柔操作）',
 Regular:'常客','Nude colors':'裸色','Cat eye':'猫眼','Revenue, last 7 days':'近7天营收',Revenue:'营收',Appointments:'预约',
  'Service mix':'项目占比','By technician':'技师业绩','This is a local demo. No messages or payments are sent.':'这是本地演示，不会发送消息或进行支付。',
 'Enter a customer name.':'请输入客户姓名。','Enter a valid phone number (at least 7 digits).':'请输入有效电话号码（至少7位数字）。','Enter a valid email address.':'请输入有效邮箱地址。',
 'Customer saved.':'客户已保存。','Appointment booked.':'预约已创建。','Appointment rescheduled.':'预约已改期。','Service started.':'服务已开始。','Appointment completed.':'预约已完成。','Customer marked as arrived.':'已标记客户到店。','Appointment cancelled.':'预约已取消。','No-show recorded in customer history.':'爽约已记入客户历史。','Demo data reset.':'演示数据已重置。','SMS demo only — no message was sent.':'仅演示短信功能，未发送消息。',
 'This time is no longer available. Choose another time.':'此时段已不可用，请选择其他时间。','Choose a time within this technician’s working hours.':'请选择技师工作时间内的时段。',
 'Choose a customer.':'请选择客户。','Choose a service, technician and date.':'请选择服务、技师和日期。','This time is already booked. Choose a highlighted opening.':'此时段已有预约，请选择标出的空档。',
};
export function translateText(text,lang) {
  if(lang!=='zh')return text;
  const value=text.trim();if(zh[value])return text.replace(value,zh[value]);
  let result=text;
  if(/^Book appointment · \$/.test(value))result=result.replace('Book appointment','确认预约');
  if(/^Available times with /.test(value))result=result.replace('Available times with ','可用时间 · ');
  if(/^\d+ customers/.test(value))result=result.replace(' customers',' 位客户').replace(' shown',' 位匹配客户');
  result=result.replace(/(\d+) appointments/g,'$1 个预约').replace(/(\d+) openings/g,'$1 个空档').replace(/(\d+) min opening/g,'$1 分钟空档').replace(/(\d+) min available/g,'$1 分钟可用').replace(/(\d+) min/g,'$1 分钟').replace(/(\d+) visits/g,'$1 次到访').replace(/(\d+) no-shows/g,'$1 次爽约').replace(/(\d+) previous no-shows/g,'此前 $1 次爽约').replace(/Last visit /g,'最近到访 ').replace(/(\d+) weeks ago/g,'$1 周前').replace(/(\d+) months? ago/g,'$1 个月前').replace(/(\d+) days ago/g,'$1 天前').replace(/With /g,'技师 ').replace(/with /g,'技师 ').replace(/Today, /g,'今日，').replace(/Tomorrow, /g,'明日，');
  for(const name of ['Gel Manicure','Acrylic Full Set','Nail Art','Pedicure'])result=result.replaceAll(name,zh[name]);
  return result;
}
export function translateDOM(root,lang) {
  if(lang!=='zh')return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes)node.textContent=translateText(node.textContent,lang);
  root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{for(const attr of ['placeholder','aria-label','title']){const value=el.getAttribute(attr);if(zh[value])el.setAttribute(attr,zh[value]);}});
}
