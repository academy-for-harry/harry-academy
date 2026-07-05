let score=0,life=5,c=null;
const i=input;
function spawn(){
 if(c)c.remove();
 let x=WORDS[Math.floor(Math.random()*WORDS.length)];
 let d=document.createElement('div');
 d.className='word';
 d.textContent=x.d;
 d.dataset.a=x.w;
 d.style.left=(20+Math.random()*(innerWidth-350))+'px';
 d.style.top='0px';
 document.body.appendChild(d);
 c=d;
 let y=0;
 let t=setInterval(()=>{
 if(!document.body.contains(d)){clearInterval(t);return;}
 y++; d.style.top=y+'px';
 if(y>innerHeight-80){
 d.remove(); clearInterval(t);
 life--;
 l.textContent='❤️'.repeat(Math.max(0,life));
 if(life<=0){alert('Game Over');location.reload();}
 else spawn();
 }
 },45);
}
i.onkeydown=e=>{
 if(e.key==='Enter'&&c){
 if(i.value.trim().toLowerCase()===c.dataset.a){
 score++; s.textContent='Score:'+score;
 c.remove(); i.value=''; spawn();
 }
 }
};
spawn();
