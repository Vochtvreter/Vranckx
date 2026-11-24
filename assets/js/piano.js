/* Tiny synthesized piano tone (Web Audio). Silent until the visitor interacts. */
window.Piano = (function(){
  let ctx = null, muted = false;
  const A4 = 440;
  function freq(semisFromA4){ return A4 * Math.pow(2, semisFromA4/12); }
  // C major scale from C4 upward, as semitones from A4
  const SCALE = [-9,-7,-5,-4,-2,0,2,3,5,7,8,10,12,14,15,17];
  function play(semis, when=0, vel=0.35){
    if (muted) return;
    try{
      ctx = ctx || new (window.AudioContext||window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime + when, f = freq(semis);
      const out = ctx.createGain();
      out.gain.setValueAtTime(0.0001, t);
      out.gain.exponentialRampToValueAtTime(vel, t + 0.008);
      out.gain.exponentialRampToValueAtTime(vel*0.35, t + 0.25);
      out.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
      const lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value = 2600;
      out.connect(lp).connect(ctx.destination);
      [[1,'triangle',1],[2,'sine',.35],[3,'sine',.12],[4.01,'sine',.05]].forEach(([m,type,g])=>{
        const o = ctx.createOscillator(), og = ctx.createGain();
        o.type = type; o.frequency.value = f*m; og.gain.value = g;
        o.connect(og).connect(out); o.start(t); o.stop(t + 2.3);
      });
    }catch(e){}
  }
  return {
    note(i, when, vel){ play(SCALE[i % SCALE.length], when, vel); },
    chord(arr, when){ arr.forEach((s,k)=>play(s, (when||0)+k*0.03, 0.18)); },
    get muted(){ return muted; }, set muted(v){ muted = v; }
  };
})();
