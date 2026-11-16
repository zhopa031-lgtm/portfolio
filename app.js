(()=>{const $=s=>document.querySelector(s),esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// nav
const nav=$('#nav'),bg=$('.burger');bg.onclick=()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');bg.setAttribute('aria-expanded',false)});
// ruler
const hero=$('.hero'),rv=$('#rv'),ru=$('#ruler');
hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),y=e.clientY-r.top;ru.style.setProperty('--y',y+'px');rv.textContent=Math.round(y/3.78)+' мм'});
// Flowdesk
const cols=['Новые','В работе','Выполнено'];let fd=[{c:'ЗаводТехМаш',t:'Диагностика пресса',s:0},{c:'Северный металл',t:'Замена гидравлики',s:1},{c:'АгроПром',t:'Плановое ТО конвейера',s:0},{c:'Полимер-Юг',t:'Калибровка датчиков',s:2}],n=['Демо-клиент','Новый станок ЧПУ'];
const tg=$('#fd-tg');
function drawFd(){$('#fd-board').innerHTML=cols.map((h,i)=>`<div class="col"><h4>${h} (${fd.filter(x=>x.s==i).length})</h4>${fd.map((x,k)=>x.s==i?`<button class="card" data-k="${k}">${esc(x.t)}<small>${esc(x.c)}${i<2?' · нажмите, чтобы продвинуть':''}</small></button>`:'').join('')}</div>`).join('');
$('#fd-stat').textContent=`Всего заявок: ${fd.length} · выполнено: ${fd.filter(x=>x.s==2).length}`}
$('#fd-board').onclick=e=>{const b=e.target.closest('.card');if(!b)return;const x=fd[b.dataset.k];if(x.s<2){x.s++;tg.textContent=`Telegram-лог (демо): «${x.t}» → ${cols[x.s]}. Сообщение клиенту ${x.c} не отправлялось.`;drawFd()}};
$('#fd-add').onclick=()=>{fd.push({c:n[0],t:n[1]+' №'+(fd.length+1),s:0});drawFd()};drawFd();
// TenderTrace
const T=[['Поставка токарных станков','Уралмаш-Сервис','Свердловская обл.',4800000,92,'станки'],['Запчасти для гидропрессов','Завод Прогресс','Татарстан',1250000,88,'гидравлика'],['Закупка подшипников','РемТранс','Москва',640000,61,'комплектующие'],['Конвейерная лента 800 мм','АгроПром','Краснодарский край',920000,74,'конвейеры'],['Офисная мебель','Администрация','Москва',310000,12,'прочее'],['Насосы промышленные','Водоканал-Юг','Краснодарский край',2100000,81,'гидравлика'],['Сварочное оборудование','СтройМеталл','Свердловская обл.',1730000,69,'станки'],['Канцелярские товары','Школа №5','Татарстан',45000,4,'прочее']];
const q=$('#tt-q'),r=$('#tt-r'),m=$('#tt-m');[...new Set(T.map(x=>x[2]))].forEach(v=>r.add(new Option(v,v)));
const fmt=v=>v.toLocaleString('ru-RU')+' ₽';
function drawTt(){const s=q.value.toLowerCase(),l=T.filter(x=>(x[0]+x[1]).toLowerCase().includes(s)&&(!r.value||x[2]==r.value)&&x[4]>=+m.value).sort((a,b)=>b[4]-a[4]);
$('#tt-o').textContent=m.value;$('#tt-b').innerHTML=l.length?l.map(x=>`<tr tabindex="0" data-i="${T.indexOf(x)}"><td>${esc(x[0])}<br><small>${esc(x[1])}</small></td><td>${fmt(x[3])}</td><td class="sc">${x[4]}</td></tr>`).join(''):'<tr><td colspan="3">Ничего не найдено. Снизьте порог релевантности или сбросьте регион.</td></tr>';
const cat={};l.forEach(x=>cat[x[5]]=(cat[x[5]]||0)+1);const mx=Math.max(1,...Object.values(cat));$('#tt-bars').innerHTML=Object.entries(cat).map(([k,v])=>`<div style="height:${v/mx*100}%" title="${k}: ${v}">${k} ${v}</div>`).join('')}
function show(i){const x=T[i];$('#tt-d').innerHTML=`<b>${esc(x[0])}</b><p>Заказчик: ${esc(x[1])}<br>Регион: ${esc(x[2])}<br>Начальная цена: ${fmt(x[3])}<br>Релевантность: <span class="sc">${x[4]}/100</span></p><p>Демо-данные: вымышленная закупка.</p>`}
[q,r,m].forEach(e=>e.oninput=drawTt);
$('#tt-b').onclick=e=>{const t=e.target.closest('tr[data-i]');if(t){document.querySelectorAll('#tt-b tr').forEach(x=>x.classList.remove('on'));t.classList.add('on');show(t.dataset.i)}};
$('#tt-b').onkeydown=e=>{if(e.key=='Enter')e.target.click()};drawTt();
// Frameport
const hue=[20,200,340,150,40,260,100,310],st=['в работе','ретушь завершена','готово к скачиванию'];let si=0,fv=new Set();
$('#fp-g').innerHTML=hue.map((h,i)=>`<button class="ph" data-i="${i}" aria-pressed="false" aria-label="Кадр ${i+1}" style="background:linear-gradient(${150+i*20}deg,hsl(${h} 45% 70%),hsl(${h+40} 35% 35%))"></button>`).join('');
$('#fp-g').onclick=e=>{const b=e.target.closest('.ph');if(!b)return;const i=b.dataset.i,o=!fv.has(i);o?fv.add(i):fv.delete(i);b.classList.toggle('on',o);b.setAttribute('aria-pressed',o);$('#fp-c').textContent='Избранное: '+fv.size};
$('#fp-next').onclick=()=>{si=(si+1)%3;$('#fp-st').textContent=st[si]};
$('#fp-send').onclick=()=>{$('#fp-m').textContent=fv.size?`Выбрано кадров: ${fv.size}. В демо данные никуда не отправляются.`:'Отметьте хотя бы один кадр сердечком.'};
// Contact: no fake success
$('#cf').addEventListener('submit',e=>{e.preventDefault();const f=e.target,d=new FormData(f),msg=$('#cf-m');let ok=true;
['name','contact','task'].forEach(k=>{const i=f.elements[k],bad=!i.value.trim();i.classList.toggle('invalid',bad);if(bad)ok=false});
if(!ok){msg.textContent='Заполните имя, контакт и описание задачи.';return}
const body=`Имя: ${d.get('name')}\nКонтакт: ${d.get('contact')}\nТип: ${d.get('type')}\n\n${d.get('task')}`;
location.href='mailto:hello@example.com?subject='+encodeURIComponent('Заявка с сайта: '+d.get('type'))+'&body='+encodeURIComponent(body);
msg.textContent='Черновик письма открыт в вашей почте. Заявка отправится, только когда вы нажмёте «Отправить» там.'});
})();
