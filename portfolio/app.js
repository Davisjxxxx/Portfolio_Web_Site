const select = (selector) => document.querySelector(selector);
const projects = await fetch('./projects.json').then(response => {
  if (!response.ok) throw new Error('Project catalog could not load');
  return response.json();
});
const byId = new Map(projects.map(project => [project.id, project]));
function element(tag, text, className) {
  const result = document.createElement(tag);
  if (text !== undefined) result.textContent = text;
  if (className) result.className = className;
  return result;
}
function button(text, className, action) {
  const result = element('button', text, className);
  result.type = 'button';
  result.addEventListener('click', action);
  return result;
}

function siteLink(url) {
  const link = element('a', new URL(url).hostname + ' ↗', 'site-link');
  link.href = url;
  return link;
}
const dialog = select('#details');
function showNovaDesign() {
  const title=element('h2','Nova Origins design preview');
  title.id='detail-title';
  const image=new Image();
  image.src='assets/nova-frontend.webp';
  image.alt='The Nova homepage shows three illustrated investigations side by side, from early galaxies through prehistoric Earth to an ancient settlement.';
  image.width=1440;
  image.height=922;
  const fullSize=element('a','Open full-size design ↗','site-link');
  fullSize.href=image.src;
  fullSize.target='_blank';
  fullSize.rel='noopener noreferrer';
  select('#detail-body').replaceChildren(title,image,element('p','The Cosmos · Earth & Life · Human Origins & Civilizations'),fullSize);
  dialog.classList.add('design-preview');
  dialog.showModal();
  dialog.scrollTop=0;
}
dialog.addEventListener('close',()=>dialog.classList.remove('design-preview'));
function showProject(project) {
  const title = element('h2', project.title);
  title.id = 'detail-title';
  const body = select('#detail-body');
  body.replaceChildren(element('p', [project.category, project.status].join(' · '), 'mono'), title);
  for (const [label, description] of [
    ['Use case', project.details.useCase],
    ['My contribution', project.details.role],
    ['Tools & methods', project.details.stack.join(' · ')],
    ['Progress & next steps', project.details.progress],
  ]) body.append(element('h3', label), element('p', description));
  if (project.url) {
    body.append(siteLink(project.url));
  }
  dialog.showModal();
  dialog.scrollTop = 0;
}
select('#close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right ||
      event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});

const filters = [
  ['All', () => true], ['AI & Agents', p => p.category === 'AI & Agents'],
  ['Web Apps', p => p.category === 'Web Apps'], ['In progress', p => p.status === 'In Progress'],
  ['Remixes', p => p.remix],
];
function drawCatalog(label, predicate) {
  const grid = select('#projects');
  grid.replaceChildren();
  for (const filter of select('#filters').children) filter.setAttribute('aria-pressed', filter.textContent === label);
  const visible = projects.filter(predicate);
  select('#results').textContent = visible.length + ' projects shown';
  for (const project of visible) {
    const card = element('article', undefined, 'card');
    card.dataset.project = project.id;
    const art = element('div', undefined, 'card-art');
    art.setAttribute('aria-hidden','true');
    if (project.id !== 'nova-origins') drawPlate(art, project.id);

    const inner = element('div', undefined, 'card-inner');
    const title = element('h3');
    title.append(button(project.title, 'card-open', () => showProject(project)));
    const meta = element('div',undefined,'card-meta');
    meta.append(element('span',project.category,'category'));
    if (project.url) meta.append(siteLink(project.url));
    inner.append(meta,title,element('p',project.summary));

    if (project.action) {
      const action = element('a',project.action.label,'card-action');
      action.href = project.action.href;
      inner.append(action);
    } else {
      inner.append(button('View case study →','card-action',() => showProject(project)));
    }
    if (project.id === 'nova-origins') {
      const preview=button('','nova-preview',showNovaDesign);
      const strip=new Image();
      strip.src='assets/nova-domains.webp';
      strip.alt='';
      strip.width=1000;
      strip.height=196;
      strip.loading='lazy';
      preview.append(strip,element('span','Preview the upcoming design ↗'));
      card.append(preview,inner);
    } else {
      card.append(art,inner);
    }
    grid.append(card);
  }
}
for (const [label,predicate] of filters) {
  select('#filters').append(button(label,'',() => drawCatalog(label,predicate)));
}
drawCatalog(...filters[0]);

// Decorative technical plates distinguish projects without implying measured results.
function drawPlate(container, id) {
  const palette = {
    'agent-forge-academy':['#192e29','#a8d2a5'],
    'career-search-assistant':['#233144','#a4c9e7'],
    'ai-build-lab':['#372c3a','#e0b2d1'],
    'hire-one':['#424632','#dfe2a4'],
    'gooci':['#372b25','#e4bf9e'],
  };
  const [base,ink] = palette[id];
  const canvas = element('canvas');
  canvas.width = 840;
  canvas.height = 230;
  container.append(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  // Transparent plates let the glass surface show through each drawing.
  ctx.strokeStyle = ctx.fillStyle = ink;
  ctx.globalAlpha = .26;
  for (let x=0;x<840;x+=20) for (let y=0;y<230;y+=20) ctx.fillRect(x,y,1.5,1.5);
  ctx.globalAlpha = .92;
  ctx.lineWidth = 2;
  function line(points) {
    ctx.beginPath();
    points.forEach(([x,y],i)=> i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
    ctx.stroke();
  }
  if (id === 'agent-forge-academy') {
    const nodes = [[80,115],[245,51],[245,176],[432,112],[607,47],[607,180],[767,116]];
    for (const [a,b] of [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6]]) line([nodes[a],nodes[b]]);
    for (const [x,y] of nodes) {
      ctx.beginPath(); ctx.arc(x,y,10,0,Math.PI*2);ctx.fillStyle=base;ctx.fill();ctx.stroke();
      ctx.fillStyle=ink;ctx.fillRect(x-2,y-2,4,4);
    }
  } else if (id === 'career-search-assistant') {
    for(let row=0;row<7;row++) {
      const y=32+row*27, x=54+row*64;
      ctx.globalAlpha=.22;line([[40,y],[800,y]]);
      ctx.globalAlpha=.9;line([[x,y],[x+170,y]]);ctx.fillRect(x+167,y-4,8,8);
    }
  } else if (id === 'ai-build-lab') {
    for(let wave=0;wave<12;wave++) {
      const points=[];
      for(let x=0;x<=840;x+=6) points.push([x,115+Math.sin(x/110+wave*.22)*Math.sin(x/220)*80]);
      line(points);
    }
  } else if (id === 'hire-one') {
    for(let col=0;col<5;col++) for(let row=0;row<3;row++){
      ctx.globalAlpha=.3+(col+row)%3*.23;ctx.strokeRect(68+col*146,30+row*57,122,40);
      ctx.fillRect(78+col*146,45+row*57,30+col*8,3);
    }
  } else {
    for(let i=0;i<13;i++) {ctx.save();ctx.translate(420,115);ctx.rotate(i*.10);ctx.strokeRect(-132,-70,264,140);ctx.restore()}
  }
}

const skills = [
  ['Agent orchestration','Adapting agent handoffs and monitoring views','agent-forge-academy'],
  ['Workflow automation','Connecting role matching with application tracking','career-search-assistant'],
  ['Research interfaces','Designing interactive views of observation data','nova-origins'],
  ['Prompt evaluation','Comparing prompts on practical business tasks','ai-build-lab'],
];
for(const [name,description,id] of skills) {
  const project=byId.get(id);
  const row=button('', 'skill-row',()=>showProject(project));
  const label=element('span');
  label.append(element('strong',name),element('small',description));
  row.append(label,element('span','↗'));
  row.setAttribute('aria-label',name+' — view '+project.title);
  select('#skill-list').append(row);
}
