const missions = [
  {name:'Deep space', icon:'✧', project:'Nova Origins', title:'Explore the Cosmic Cliffs', instruction:'Tap the markers in Webb’s image to find the pillar rising from the ridge. Then enter Nova’s live space field and select a signal to see where it came from.', link:['Enter the live space field ↗','https://nova-origins.com/signals'], note:'The live field maps records from astronomy archives.', render:space},
  {name:'Universe theory', icon:'◉', project:'Universe Theory · physics exercise', title:'Double a black hole’s horizon', instruction:'A black hole with five solar masses has a horizon about 14.8 km in radius. Adjust the mass until the new horizon is twice as large.', link:['Explore Nova’s research program ↗','https://nova-origins.com/universe-cinematic/'], note:'This exercise uses the Schwarzschild model for a nonrotating, uncharged black hole.', render:theory},
  {name:'Ancient worlds', icon:'◇', project:'Nova Origins · Ancient Civilizations preview', title:'Read a 100,000-year-old face', instruction:'Inspect two features on the Skhūl V skull. Switch between the brow and the vault to learn what anatomists can see in its shape.', link:['Read the Smithsonian record ↗','https://humanorigins.si.edu/evidence/human-fossils/fossils/skh%C5%ABl-v'], note:'Mount Carmel, Israel. The fossil’s estimated age is 80,000–120,000 years.', render:archaeology},
  {name:'Evidence trail', icon:'⌕', project:'GOOCI Receipts · sample case', title:'Trace a claim to its receipt', instruction:'The headline says twelve sites were reviewed. Open the underlying log, then narrow the report to entries with a signed review. Watch the headline change.', link:['Visit goociusa.com ↗','https://goociusa.com/'], note:'The company and records in this exercise are fictional.', render:evidence},
  {name:'Workflow lab', icon:'⌁', project:'Hire One · workflow estimator', title:'Find time hiding in a task', instruction:'Set a weekly volume and handling time for a repeated task. Then change how many minutes a person still needs to review each result.', link:['Visit gethireone.com ↗','https://gethireone.com/'], note:'Illustrative estimate before setup, maintenance, and exceptions.', render:workflow},
  {name:'Agent workshop', icon:'⤳', project:'Agent Forge Academy · practice sandbox', title:'Build a working handoff', instruction:'Route a sample support ticket. Add a reader, a classifier, and a router to the workbench in the order you want them to run. Test it and inspect the trace.', note:'Runs locally on a fixed example ticket. You can rebuild and replay the workflow.', render:agents},
];
const picker = document.querySelector('#missions');
const station = document.querySelector('#station');
const complete = new Set();
function make(tag, text, cls) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (cls) node.className = cls;
  return node;
}
function link(label, url) {
  const item = make('a',label,'site-link');
  item.href = url;
  item.target = '_blank';
  item.rel = 'noopener noreferrer';
  return item;
}
function action(text, fn, cls='control') {
  const item = make('button',text,cls);
  item.type = 'button';
  item.addEventListener('click',fn);
  return item;
}
function mount(mission,index) {
  const panel = make('section',undefined,'station');
  panel.id = 'experience-' + index;
  const tab = action('',() => {
    for (const item of station.children) item.hidden = item !== panel;
    for (const item of picker.children) item.setAttribute('aria-pressed',String(item === tab));
  },'mission');
  tab.setAttribute('aria-controls',panel.id);
  tab.setAttribute('aria-pressed',String(index === 0));
  const icon = make('span',mission.icon,'mission-icon');
  icon.setAttribute('aria-hidden','true');
  tab.append(icon,make('span',mission.name));
  picker.append(tab);
  const stage=make('div',undefined,'stage');
  const copy=make('div',undefined,'brief');
  const title=make('h3',mission.title);
  title.id='mission-title-'+index;
  panel.setAttribute('aria-labelledby',title.id);
  copy.append(make('p',mission.project,'mono'),title,make('p',mission.instruction));
  const feedback=make('p','','finding');
  feedback.setAttribute('role','status');
  copy.append(feedback);
  if(mission.link) copy.append(link(...mission.link));
  copy.append(make('small',mission.note));
  panel.append(stage,copy);
  station.append(panel);
  panel.hidden=index!==0;
  mission.render(stage,(text,earned=false)=>{
    feedback.textContent=text;
    if(!earned || complete.has(index)) return;
    complete.add(index);
    tab.dataset.complete='true';
    tab.setAttribute('aria-label',mission.name+' — explored');
    document.querySelector('#log-count').textContent=complete.size+' / '+missions.length+' explored';
  });
}
function imageField(stage,src,alt,cls) {
  const figure=make('figure',undefined,'field-image '+cls);
  const image=new Image();
  image.src=src;
  image.alt=alt;
  figure.append(image);
  stage.append(figure);
  return figure;
}
function marker(figure,x,y,label,number,inspect) {
  const pin=action(number,()=>{
    for(const item of figure.querySelectorAll('.pin')) item.setAttribute('aria-pressed',String(item===pin));
    inspect();
  },'pin');
  pin.style.left=x+'%';
  pin.style.top=y+'%';
  pin.title=label;
  pin.setAttribute('aria-label',label);
  pin.setAttribute('aria-pressed','false');
  figure.append(pin);
}
function space(stage,report) {
  const figure=imageField(stage,'assets/cosmic-cliffs.jpg','Webb infrared view of blue open space above a scalloped copper wall, with a small upright pillar on the left.','cliffs');
  marker(figure,19,30,'Inspect the upright pillar','A',()=>report('Pillar located. Hot stars are eroding the gas and dust around it, carving out the cavity you see in blue.',true));
  marker(figure,36,11,'Inspect a bright star','B',()=>report('Those sharp rays are diffraction spikes around a bright star. Look below and left for a shape connected to the ridge.'));
  marker(figure,75,72,'Inspect the cloud interior','C',()=>report('This patch is inside the dusty wall. Follow the boundary toward the left until a single peak rises against the blue.'));
  stage.append(link('Cosmic Cliffs · Webb / NIRCam · NASA, ESA, CSA, STScI ↗','https://esawebb.org/images/weic2205a/'));
}
function slider(parent,label,min,max,value,change) {
  const wrap=make('label',undefined,'slider');
  const name=make('span',label);
  const control=make('input');
  control.id='range-'+label.toLowerCase().replaceAll(' ','-');
  wrap.htmlFor=control.id;
  control.type='range';control.min=min;control.max=max;control.value=value;
  const output=make('output',String(value));
  wrap.append(name,output,control);
  control.addEventListener('input',()=>{output.value=control.value;change(Number(control.value))});
  parent.append(wrap);
  return control;
}
function theory(stage,report) {
  const bench=make('div',undefined,'bench gravity');
  const diagram=make('div',undefined,'horizon-plot');
  diagram.setAttribute('aria-hidden','true');
  diagram.append(make('i',undefined,'target-ring'),make('i',undefined,'horizon-ring'));
  const meter=make('strong','14.8 km','readout');
  bench.append(diagram,meter,make('small','Horizon radius · target 29.5 km'));
  slider(bench,'Mass in solar masses',1,15,5,mass=>{
    const radius=mass*2.953;
    diagram.style.setProperty('--size',mass*10+'px');
    meter.textContent=radius.toFixed(1)+' km';
    report(mass===10?'Match. Doubling the mass doubles the radius. The model gives r = 2GM / c².':'Compare the glowing horizon with the dashed target ring.',mass===10);
  });
  stage.append(bench,link('Model reference · NASA ↗','https://imagine.gsfc.nasa.gov/science/objects/black_holes2.html'));
}
function archaeology(stage,report) {
  const frame=make('div',undefined,'specimen');
  stage.append(frame);
  const figure=imageField(frame,'assets/skhul.jpg','Side view of Skhūl V showing its projecting brow ridge and rounded upper skull.','skhul');
  const seen=new Set();
  function examine(key,text) {
    seen.add(key);
    report(text+(seen.size===2?' Both features logged.':''),seen.size===2);
  }
  marker(figure,17,32,'Inspect the brow ridge','A',()=>examine('brow','The bone projects above the eye socket. The Smithsonian describes this brow ridge as a feature also seen in earlier humans.'));
  marker(figure,56,13,'Inspect the cranial vault','B',()=>examine('vault','The high, rounded vault is a feature anatomists recognize in modern human skulls.'));
  stage.append(link('Photo · Wapondaponda / UtaUtaNapishtim ↗','https://commons.wikimedia.org/wiki/File:Skhul.JPG'),link('CC BY-SA 3.0 ↗','https://creativecommons.org/licenses/by-sa/3.0/'));
}
function evidence(stage,report) {
  const bench=make('div',undefined,'bench');
  const count=make('strong','12 sites','readout');
  const status=make('p','Claim in the sample annual summary');
  const receipt=make('div',undefined,'receipt');
  receipt.hidden=true;
  for (const [group,scope] of [['North · 4 sites','Signed review'],['West · 5 sites','Inventory only'],['Coast · 3 sites','Inventory only']]) {
    const row=make('p');
    row.append(make('strong',group),make('span',scope));receipt.append(row);
  }
  const filter=make('label',undefined,'check');
  const check=make('input');check.type='checkbox';check.disabled=true;
  filter.append(check,document.createTextNode(' Count signed reviews only'));
  const open=action('Open the source log',()=>{
    receipt.hidden=false;check.disabled=false;open.hidden=true;
    report('All twelve sites are listed, but only one group has signed review records. Apply the scope filter.');
  });
  check.onchange=()=>{
    count.textContent=check.checked?'4 sites':'12 sites';
    status.textContent=check.checked?'Covered by signed reviews':'Listed in the sample inventory';
    report(check.checked?'Evidence traced. Four of twelve sites have a review on record. The remaining eight have an inventory entry only.':'Showing the full inventory.',check.checked);
  };
  bench.append(make('p','Sample annual summary','mono'),count,status,open,receipt,filter);stage.append(bench);
}
function workflow(stage,report) {
  const bench=make('div',undefined,'bench');
  const total=make('strong',undefined,'readout');
  const balance=make('p');
  const bar=make('div',undefined,'timebar');
  bench.append(make('p','Weekly time available to reclaim','mono'),total,balance,bar);
  const volume=slider(bench,'Tasks per week',1,100,30,()=>calculate(true));
  const minutes=slider(bench,'Current minutes per task',1,30,12,()=>calculate(true));
  const review=slider(bench,'Review minutes per task',0,30,3,()=>calculate(true));
  function calculate(interacted) {
    const before=volume.value*minutes.value,after=volume.value*review.value;
    const saved=before-after;
    total.textContent=(Math.abs(saved)/60).toFixed(1)+(saved<0?' h extra':' h saved');
    balance.textContent=before+' min today → '+after+' min with review';
    bar.style.setProperty('--portion',Math.max(0,Math.min(100,100*saved/before))+'%');
    if(interacted) report(saved>0?'Estimate recorded. The gap between handling and review time determines the opportunity.':saved<0?'Review would take longer than the original task. This workflow costs time at these settings.':'Break-even. Keeping review time equal to the original task saves no time.',true);
  }
  calculate(false);stage.append(bench);
}
function agents(stage,report) {
  const bench=make('div',undefined,'bench');
  const chain=[],tools=make('div',undefined,'toolbox'),trace=make('ol',undefined,'trace');
  const order=make('p','Workbench empty','chain');
  const stages=['Read','Classify','Route'];
  const addButtons=stages.map(name=>action('+ '+name,()=>{
    chain.push(name);
    refresh();
    trace.replaceChildren();
    report('Run the ticket to inspect the handoff.');
  }));
  tools.append(...addButtons);
  function refresh() {
    order.textContent=chain.join(' → ') || 'Workbench empty';
    addButtons.forEach((b,i)=>{b.disabled=chain.includes(stages[i])});
  }
  const run=action('Run ticket →',()=>{
    trace.replaceChildren();
    const ticket={};
    for(const step of chain) {
      let result;
      if(step==='Read'){ticket.text='My invoice was charged twice.';result=ticket.text}
      if(step==='Classify'&&ticket.text){ticket.category=ticket.text.includes('invoice')?'Billing':'General';result=ticket.category}
      if(step==='Route'&&ticket.category){ticket.queue=ticket.category+' review queue';result=ticket.queue}
      trace.append(make('li',step+' → '+(result || 'Missing input')));
      if(!result){report(step+' needs the previous stage’s output. Rebuild the chain and try again.');return}
    }
    report(ticket.queue?'Ticket delivered. The trace shows exactly what each agent passed to the next.':'The ticket has not reached a queue. Add the missing stages and run again.',Boolean(ticket.queue));
  });
  const reset=action('Rebuild',()=>{chain.length=0;trace.replaceChildren();refresh();report('Workbench cleared. Choose a new order.')});
  bench.append(make('p','Sample support ticket','mono'),make('blockquote','“My invoice was charged twice.”'),tools,order,run,reset,trace);
  stage.append(bench);
}
missions.forEach(mount);
