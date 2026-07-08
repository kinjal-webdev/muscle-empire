import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import aboutImg from "@/assets/images/CHAMPION.jpeg";

const MILESTONES = [
  { year:"AIU",    label:"All India Univ.", achievements:[{title:"2015–16",result:"Bronze Medal",medal:"bronze"},{title:"2013–14",result:"Represented Mumbai Univ.",medal:"blue"}] },
  { year:"MU",     label:"Mumbai Univ.",   achievements:[{title:"2016–17",result:"Silver Medal",medal:"silver"},{title:"2015–16",result:"Gold Medal",medal:"gold"},{title:"2013–14",result:"Gold Medal",medal:"gold"},{title:"2012–13",result:"Silver Medal",medal:"silver"}] },
  { year:"2017",   label:"Senior Title",   achievements:[{title:"Mumbai Shree",result:"Overall Champion",medal:"gold"},{title:"Maharashtra Shree",result:"Gold Medal",medal:"gold"},{title:"Bharat Shree",result:"Gold Medal",medal:"gold"}] },
  { year:"2012–16",label:"Dominant Era",   achievements:[{title:"Mumbai Kumar",result:"Overall Champion",medal:"gold"},{title:"Maharashtra Kumar",result:"Gold Medal",medal:"gold"},{title:"Bharat Kumar",result:"Gold Medal",medal:"gold"}] },
  { year:"2011",   label:"Junior Debut",   achievements:[{title:"Mumbai Kishor",result:"Overall Champion",medal:"gold"},{title:"Maharashtra Kishor",result:"Gold Medal",medal:"gold"},{title:"Bharat Kishor",result:"Gold Medal",medal:"gold"}] },
];
const COUNTERS = [
  { Icon:Trophy, label:"Titles",      value:10 },
  { Icon:Medal,  label:"Gold Medals", value:12 },
  { Icon:Medal,  label:"Silvers",     value:4  },
  { Icon:Award,  label:"Wins",        value:15 },
];
function medalColor(m:string){if(m==="gold")return"#E8A820";if(m==="silver")return"#94A3B8";if(m==="bronze")return"#D97706";return"#60A5FA";}
function medalIcon(m:string){if(m==="gold")return"🥇";if(m==="silver")return"🥈";if(m==="bronze")return"🥉";return"🏅";}

function Counter({value,label,Icon}:{value:number;label:string;Icon:typeof Trophy}){
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true,margin:"-40px"});
  const [cur,setCur]=useState(0);
  useEffect(()=>{
    if(!inView)return;
    let n=0;const step=Math.ceil(value/32);
    const t=setInterval(()=>{n+=step;if(n>=value){setCur(value);clearInterval(t);}else setCur(n);},38);
    return()=>clearInterval(t);
  },[inView,value]);
  return(
    <div ref={ref} className="flex flex-col items-center gap-1 text-center min-w-0">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-0.5 shrink-0"
        style={{background:"rgba(232,168,32,0.12)",color:"#E8A820"}}>
        <Icon size={16} strokeWidth={1.8}/>
      </div>
      <span className="font-display font-black text-white leading-none"
        style={{fontSize:"clamp(1.2rem,4vw,1.9rem)"}}>{cur}+</span>
      <span className="text-[#F2EFE9]/40 uppercase tracking-wide leading-tight"
        style={{fontSize:"clamp(0.55rem,1.6vw,0.68rem)"}}>{label}</span>
    </div>
  );
}

function AchievementCard({ms}:{ms:typeof MILESTONES[0]}){
  return(
    <motion.div key={ms.year}
      initial={{opacity:0,y:16,scale:0.97}} animate={{opacity:1,y:0,scale:1}}
      exit={{opacity:0,y:-10,scale:0.97}} transition={{duration:0.42,ease:[0.16,1,0.3,1]}}
      className="relative rounded-[18px] p-5 sm:p-6 overflow-hidden"
      style={{
        background:"#FAF8F5",
        border:"1.5px solid transparent",
        backgroundClip:"padding-box",
        boxShadow:"0 0 0 1.5px rgba(232,168,32,0.30), 0 6px 28px rgba(0,0,0,0.07), 0 0 32px rgba(232,168,32,0.10)",
      }}>
      {/* Radial glow on border */}
      <div className="absolute inset-0 rounded-[18px] pointer-events-none"
        style={{ background:"radial-gradient(ellipse 90% 60% at 50% 0%, rgba(232,168,32,0.10) 0%, transparent 65%)" }}/>
      <div className="absolute top-0 left-[12%] right-[12%] h-px pointer-events-none"
        style={{background:"linear-gradient(90deg,transparent,rgba(232,168,32,0.6),transparent)"}}/>
      <p className="text-[#E8A820] text-[10px] font-black uppercase tracking-widest mb-0.5 relative z-10">{ms.year}</p>
      <h4 className="text-[#1C1C1E] font-black text-[1.05rem] sm:text-[1.15rem] mb-4 relative z-10">{ms.label}</h4>
      <div className="space-y-2.5 relative z-10">
        {ms.achievements.map((a,i)=>(
          <div key={i} className="flex items-start justify-between gap-3">
            <span className="text-[#222] font-semibold" style={{fontSize:"clamp(0.88rem,2.5vw,0.98rem)"}}>{a.title}</span>
            <span className="text-[12px] font-black uppercase tracking-wide shrink-0 text-right flex items-center gap-1"
              style={{color:medalColor(a.medal)}}>
              {/* Trophy icon for Overall Champion */}
              {a.result.includes("Overall") ? <Trophy size={12} strokeWidth={2.5}/> : <span>{medalIcon(a.medal)}</span>}
              {a.result}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function About(){
  const [active,setActive]=useState(0);
  const lineRef=useRef<HTMLDivElement>(null);
  const inView=useInView(lineRef,{once:true});
  const autoRef=useRef<ReturnType<typeof setInterval>>();
  const N=MILESTONES.length;
  const reset=()=>{
    clearInterval(autoRef.current);
    autoRef.current=setInterval(()=>setActive(a=>(a+1)%N),3000);
  };
  useEffect(()=>{reset();return()=>clearInterval(autoRef.current);},[]);

  return(
    <section id="about" className="py-20 bg-[#F0EEE9] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent"/>

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-10 lg:gap-14 items-start">

          {/* Image */}
          <motion.div initial={{opacity:0,x:-36}} whileInView={{opacity:1,x:0}}
            viewport={{once:true,margin:"-80px"}} transition={{duration:0.85,ease:[0.16,1,0.3,1]}}
            className="relative">
            {/* 10+ Titles badge with glow effect */}
            <motion.div
              animate={{y:[0,-6,0]}} transition={{duration:3.5,repeat:Infinity,ease:"easeInOut"}}
              whileHover={{scale:1.08}}
              className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl cursor-default"
              style={{
                background:"#E8A820",
                boxShadow:"0 8px 28px rgba(232,168,32,0.55), 0 0 0 0 rgba(232,168,32,0.4)",
                animation:"pulse-gold 2s ease-in-out infinite, float-badge 3.5s ease-in-out infinite",
              }}>
              <Trophy size={15} className="text-black"/>
              <span className="text-black font-black text-[11px] uppercase tracking-wide whitespace-nowrap">10+ Titles</span>
            </motion.div>
            <style>{`
              @keyframes float-badge{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
              @keyframes badge-pulse{0%,100%{box-shadow:0 8px 28px rgba(232,168,32,.55),0 0 0 0 rgba(232,168,32,.4)}70%{box-shadow:0 8px 28px rgba(232,168,32,.55),0 0 0 12px rgba(232,168,32,0)}}
            `}</style>

            <motion.div whileHover={{scale:1.02}} transition={{duration:0.45}}
              className="relative rounded-[20px] overflow-hidden group"
              style={{border:"1.5px solid rgba(232,168,32,0.35)",boxShadow:"0 20px 72px rgba(0,0,0,0.16)"}}>
              <img src={aboutImg} alt="Champion — Muscle Empire"
                className="w-full object-cover filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                style={{aspectRatio:"3/4"}}/>
              <div className="absolute bottom-0 inset-x-0 z-10 px-5 py-5"
                style={{background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 100%)"}}>
                <p className="text-white font-black text-[1.3rem] leading-tight tracking-tight"
                  style={{ textShadow:"0 2px 12px rgba(232,168,32,0.4)" }}>
                  Sagar Kharat
                </p>
                <p className="text-[#E8A820] text-[0.85rem] font-bold uppercase tracking-widest mt-1">
                  Professional Bodybuilder · Muscle Empire
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <motion.div initial={{opacity:0,x:36}} whileInView={{opacity:1,x:0}}
            viewport={{once:true,margin:"-80px"}} transition={{duration:0.85,ease:[0.16,1,0.3,1]}}>

            <div className="eyebrow mb-3">Hall of Fame</div>
            <h2 className="font-display font-black text-[#1C1C1E] leading-tight mb-8"
              style={{fontSize:"clamp(1.8rem,4vw,2.9rem)"}}>
              Champion's <span className="text-gold-gradient">journey</span>
            </h2>

            {/* Counters — lighter bg + glow border */}
            <div className="relative grid grid-cols-4 gap-2 sm:gap-3 mb-10 p-4 sm:p-5 rounded-2xl overflow-hidden"
              style={{
                background:"#252528",
                boxShadow:"0 0 0 1.5px rgba(232,168,32,0.30), 0 0 40px rgba(232,168,32,0.14), 0 8px 32px rgba(0,0,0,0.28)",
              }}>
              <div className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ background:"radial-gradient(ellipse 90% 70% at 50% 50%, rgba(232,168,32,0.10) 0%, transparent 70%)" }}/>
              <div className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                style={{ background:"linear-gradient(90deg,transparent,rgba(232,168,32,0.50),transparent)" }}/>
              <div className="absolute bottom-0 left-[10%] right-[10%] h-px pointer-events-none"
                style={{ background:"linear-gradient(90deg,transparent,rgba(232,168,32,0.20),transparent)" }}/>
              {COUNTERS.map((c,i)=><Counter key={i} value={c.value} label={c.label} Icon={c.Icon}/>)}
            </div>

            {/* ── Timeline ─────────────────────────────── */}
            <div ref={lineRef} className="relative mb-7 rounded-xl px-3 pt-3 pb-2"
              style={{ background:"#FAF8F5" }}>
              {/*
                Line runs between dot edges.
                Each dot is max 34px wide. We pad the line container by 17px each side
                so the line starts/ends at dot centre, but visually the dot COVERS the line end.
                We clip the line inside the dot area by adjusting left/right to dot_half + gap.
                Simplest: make the line shorter than the flex row by exactly one dot radius each end.
              */}

              {/* Invisible spacer row to measure height — dots sit in the real row below */}
              <div className="flex justify-between items-center mb-3">
                {/* Line track — starts and ends 17px in from each side edge (half of max 34px dot) */}
                <div className="absolute h-[3px] bg-black/[0.09] rounded-full z-0"
                  style={{ top:"calc(0.75rem + 17px)", left:"calc(0.75rem + 17px)", right:"calc(0.75rem + 17px)" }}/>
                <motion.div className="absolute h-[3px] rounded-full z-0"
                  style={{
                    background:"linear-gradient(90deg,#E8A820,#FF9500)",
                    top:"calc(0.75rem + 17px)",
                    left:"calc(0.75rem + 17px)",
                    right:"calc(0.75rem + 17px)",
                    transformOrigin:"left",
                    scaleX:0,
                  }}
                  animate={inView?{ scaleX:1 }:{}}
                  transition={{ duration:1.4, ease:"easeOut", delay:0.2 }}/>

                {MILESTONES.map((ms,i)=>(
                  <button key={i} onClick={()=>{setActive(i);reset();}}
                    className="flex flex-col items-center gap-3 focus:outline-none relative z-10"
                    style={{ transition:"transform 0.3s ease" }}
                    onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.05)")}
                    onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>
                    <motion.div
                      animate={{
                        width:  i===active?34:24,
                        height: i===active?34:24,
                        background: i===active?"#E8A820":"#FAF8F5",
                        boxShadow: i===active?"0 0 0 5px rgba(232,168,32,0.20),0 0 22px rgba(232,168,32,0.50)":"none",
                        borderColor: i===active?"#E8A820":"rgba(232,168,32,0.40)",
                        borderWidth:"1.5px",
                      }}
                      transition={{ duration:0.35, ease:"easeOut" }}
                      className="rounded-full flex items-center justify-center border border-solid"
                    >
                      <Trophy size={i===active?13:10}
                        className={i===active?"text-black":"text-[#E8A820]/55"}
                        strokeWidth={i===active?3:1.5}/>
                    </motion.div>
                    <span className={`font-black uppercase whitespace-nowrap transition-all duration-300 ${
                      i===active?"text-[#C8860A]":"text-[#1C1C1E]/45"
                    }`} style={{ fontSize:"clamp(0.72rem,1.9vw,0.85rem)", letterSpacing:"0.04em", fontWeight:i===active?900:700 }}>
                      {ms.year}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Achievement card — no scroll container needed, AnimatePresence handles swap */}
            <AnimatePresence mode="wait">
              <AchievementCard key={active} ms={MILESTONES[active]}/>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
