// ============================================================
// APP — GMGame React Component
// Depends on: vendor.js, config.js, firebase.js, constants.js, utils.js
// ============================================================
function _optionalChain(ops) { var lastAccessLHS = undefined; var value = ops[0]; var i = 1; while (i < ops.length) { var op = ops[i]; var fn = ops[i + 1]; i += 2; if ((op === "optionalAccess" || op === "optionalCall") && value == null) { return undefined; } if (op === "access" || op === "optionalAccess") { lastAccessLHS = value; value = fn(value); } else if (op === "call" || op === "optionalCall") { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var { useState, useEffect, useRef, useCallback } = React;

function GMGame(){
  var[screen,setScreen]=useState("auth");
  var[playerName,setPlayerName]=useState("Cei");
  var[playerClass,setPlayerClass]=useState("Warrior");
  var[saveSlots,setSaveSlots]=useState([null,null,null]);
  var[activeSlot,setActiveSlot]=useState(1);
  var[selectedSlot,setSelectedSlot]=useState(1);
  var[confirmDeleteSlot,setConfirmDeleteSlot]=useState(null);
  var[tutorialStep,setTutorialStep]=useState(-1);
  var[tutorialDone,setTutorialDone]=useState(false);
  var[killStreak,setKillStreak]=useState(0);
  var[bannerTurns,setBannerTurns]=useState(0);
  var[me,setMe]=useState(null);
  var[region,setRegion]=useState("Starter Isle");
  var[shielded,setShielded]=useState(false);
  var[poisoned,setPoisoned]=useState(false);
  var[stunned,setStunned]=useState(false);
  var[rageTurns,setRageTurns]=useState(0);
  var[hasteBonus,setHasteBonus]=useState(0);
  var[skillPoints,setSkillPoints]=useState(0);
  var[learnedSkills,setLearnedSkills]=useState({});
  var[achievements,setAchievements]=useState([]);
  var[party,setParty]=useState(null);
  var[dungeon,setDungeon]=useState(null);
  var dungeonRef=useRef(null);
  var[gameView,setGameView]=useState("world");
  var[invTab,setInvTab]=useState("equip");
  var[encounter,setEncounter]=useState(null);
  var[combatTurn,setCombatTurn]=useState("player");
  var[combatItemOpen,setCombatItemOpen]=useState(false);
  var[selectedTargetIdx,setSelectedTargetIdx]=useState(0);
  var[exploring,setExploring]=useState(false);
  var[resting,setResting]=useState(false);
  var[notification,setNotification]=useState(null);
  var[gameLog,setGameLog]=useState([]);
  var[quests,setQuests]=useState(GLOBAL_QUESTS);
  var[deathScreen,setDeathScreen]=useState(null);
  var[levelUpInfo,setLevelUpInfo]=useState(null);
  var[dungeonComplete,setDungeonComplete]=useState(null);
  var[newAchievement,setNewAchievement]=useState(null);
  var[boardSort,setBoardSort]=useState("level");
  var[gmOpen,setGmOpen]=useState(false);
    var[comboCount,setComboCount]=useState(0);
  var comboMult=comboCount===0?1:comboCount===1?1.2:comboCount===2?1.5:comboCount===3?2.0:2.5;
    var[learnedSpells,setLearnedSpells]=useState([]);
  var[spellCastOpen,setSpellCastOpen]=useState(false);
    var[randomEvent,setRandomEvent]=useState(null); // {type:"shrine"|"wanderer", data:{...}}
  var[gmTab,setGmTab]=useState("world");
  var[activeEvents,setActiveEvents]=useState([]);
  var[eventTimers,setEventTimers]=useState({});
  var[weather,setWeather]=useState("clear");
  var[weatherLocked,setWeatherLocked]=useState(false);
  var[timeOfDay,setTimeOfDay]=useState(14);
  var[xpMult,setXpMult]=useState(1);
  var[goldMult,setGoldMult]=useState(1);
  var[spawnRate,setSpawnRate]=useState(50);
  var[npcPlayers,setNpcPlayers]=useState(NPC_PLAYERS);
  var[gmLogs,setGmLogs]=useState([{t:"00:00:00",msg:"World initialized. #Etherion-7",type:"system"}]);
  var[pvpEnabled,setPvpEnabled]=useState(true);
  var[lockedRegions,setLockedRegions]=useState([]);
  var[whisper,setWhisper]=useState(null);
  var[announcement,setAnnouncement]=useState(null);
  var[gmPuppet,setGmPuppet]=useState(null);
  var[gmBounties,setGmBounties]=useState([]);
  var[gmCustomItems,setGmCustomItems]=useState({});
  var[gmShopMods,setGmShopMods]=useState([]);
  var[gmStatEdit,setGmStatEdit]=useState({atk:"",mag:"",hp:"",mana:"",level:"",gold:""});
  var[gmShopForm,setGmShopForm]=useState({item:"Health Potion",shop:"all",duration:"permanent"});
  var[gmAnnounceForm,setGmAnnounceForm]=useState({text:"",color:"#44ffcc",icon:"📢"});
  var[gmWhisperForm,setGmWhisperForm]=useState({text:"",color:"#aa88ff"});
  var[gmBountyForm,setGmBountyForm]=useState({name:"",desc:"",goal:1,type:"kills",rewardType:"gold",rewardGold:500,rewardItem:"Health Potion"});
  var[gmCustomItemForm,setGmCustomItemForm]=useState({name:"",icon:"⚔️",type:"weapon",effect:"atk",value:20,desc:""});
  var[gmCustomEventForm,setGmCustomEventForm]=useState({name:"",icon:"🌟",color:"#44ffcc",desc:"",duration:60,xpMult:1,goldMult:1});
  // ── AUTH + GLOBAL SERVER STATE ────────────────────────────
  var[authUser,setAuthUser]=useState(null);       // Firebase Auth user object
  var[authScreen,setAuthScreen]=useState("login");// "login"|"register"
  var[authEmail,setAuthEmail]=useState("");
  var[authPassword,setAuthPassword]=useState("");
  var[authUsername,setAuthUsername]=useState("");
  var[authError,setAuthError]=useState("");
  var[authLoading,setAuthLoading]=useState(true); // waiting for auth state
  var[myUid,setMyUid]=useState(null);
  var[onlinePlayers,setOnlinePlayers]=useState({}); // uid -> {name,cls,level,region,online,...}
  var[isGMMode,setIsGMMode]=useState(false);
  var[fbStatus,setFbStatus]=useState(_fbEnabled?"connected":"offline");
  // ── GLOBAL CHAT ────────────────────────────────────────────
  var[chatOpen,setChatOpen]=useState(false);
  var[chatMessages,setChatMessages]=useState([]);
  var[chatInput,setChatInput]=useState("");
  var[chatUnread,setChatUnread]=useState(0);
  var chatEndRef=useRef(null);
  // ──────────────────────────────────────────────────────────
  var gameLogRef=useRef(null);
  var gmLogRef=useRef(null);
  var encounterRef=useRef(null);

    useEffect(()=>{
    window._reactMounted=true;
    window._clearLoadTimeout&&window._clearLoadTimeout();
    var el=document.getElementById('loading');
    if(el){el.classList.add('fade-out');setTimeout(()=>{el.style.display='none';},420);}
  },[]);

  useEffect(()=>{dungeonRef.current=dungeon;},[dungeon]);
  useEffect(()=>{encounterRef.current=encounter;},[encounter]);
  var wfx=WEATHER_EFFECTS[weather]||WEATHER_EFFECTS.clear;
  var isNight=timeOfDay<6||timeOfDay>=21;
  var isDay=timeOfDay>=9&&timeOfDay<18;
  var allItems={...ITEMS,...gmCustomItems};
  var isGM = myUid === GM_UID && isGMMode;

  var gLog=useCallback((msg,type="info")=>{setGameLog(prev=>[...prev.slice(-60),{t:ts(),msg,type}]);},[]);
  var gmLog=useCallback((msg,type="info")=>{setGmLogs(prev=>[...prev.slice(-60),{t:ts(),msg,type}]);},[]);
  var notify=useCallback((msg,color="#e8aa44")=>{setNotification({msg,color});setTimeout(()=>setNotification(null),3200);},[]);

  useEffect(()=>{if(gameLogRef.current)gameLogRef.current.scrollTop=gameLogRef.current.scrollHeight;},[gameLog]);
  useEffect(()=>{if(gmLogRef.current)gmLogRef.current.scrollTop=gmLogRef.current.scrollHeight;},[gmLogs]);
  useEffect(()=>{setSaveSlots([readSlotMeta(1),readSlotMeta(2),readSlotMeta(3)]);},[]);
  useEffect(()=>{
    if(!me||screen!=="game")return;
    saveToSlot(activeSlot,{me,region,skillPoints,learnedSkills,learnedSpells,quests,achievements});
    setSaveSlots([readSlotMeta(1),readSlotMeta(2),readSlotMeta(3)]);
  },[me,region,quests,skillPoints,learnedSkills,learnedSpells,achievements,screen,activeSlot]);

  var loadGame=useCallback((slot)=>{
    try{
      var d=loadFromSlot(slot);
      if(!d||!d.me){notify("No save in slot "+slot+"!","#ff5533");return;}
      var m2={...d.me};
      if(!m2.equipped)m2.equipped=[];
      if(!m2.inventory)m2.inventory=[];
      if(!m2.regionsVisited)m2.regionsVisited=["Starter Isle"];
      if(!m2.dungeonsCleared)m2.dungeonsCleared=0;
      if(!m2.kills)m2.kills=0;
      // Reset any stale combat/dungeon state from previous session
      setEncounter(null);setDungeon(null);dungeonRef.current=null;
      setCombatTurn("player");setShielded(false);setPoisoned(false);setStunned(false);
      setRageTurns(0);setHasteBonus(0);setExploring(false);setResting(false);
      setGameView("world");setParty(null);
      setMe(m2);
      setRegion(d.region||"Starter Isle");
      setSkillPoints(d.skillPoints||0);
      setLearnedSkills(d.learnedSkills||{});
      setLearnedSpells(d.learnedSpells||[]);
      if(d.quests&&d.quests.length)setQuests(d.quests);
      if(d.achievements)setAchievements(d.achievements);
      setActiveSlot(slot);
      setTutorialStep(-1);
      setTimeout(()=>gLog("Slot "+slot+" loaded!","system"),50);
      enterGame(m2,slot);
    }catch(e4){notify("Load failed!","#ff5533");}
  },[gLog,notify,enterGame]);

  useEffect(()=>{
    if(!activeEvents.length)return;
    var iv=setInterval(()=>{
      var expired=[];
      setEventTimers(prev=>{
        var next={...prev};
        for(var id in next){next[id]--;if(next[id]<=0){expired.push(id);delete next[id];}}
        return next;
      });
      // Apply side-effects outside the updater so it stays pure
      if(expired.length){
        setActiveEvents(ae=>ae.filter(e=>!expired.includes(e)));
        expired.forEach(id=>{
          var ev=WORLD_EVENTS.find(e=>e.id===id)||{name:id};
          gmLog("Event ended: "+ev.name,"system");gLog(ev.name+" event ended.","system");
          if(id==="festival")setXpMult(1);if(id==="goldrush")setGoldMult(1);if(id==="war")setPvpEnabled(false);
        });
      }
    },1000);
    return()=>clearInterval(iv);
  },[activeEvents,gLog,gmLog]);

  useEffect(()=>{
    var iv=setInterval(()=>{
      var on=npcPlayers.filter(n=>n.status==="online");if(!on.length)return;
      var n=on[rnd(0,on.length-1)];gLog("["+n.name+"] "+NPC_ACTIONS[rnd(0,NPC_ACTIONS.length-1)](n),"npc");
    },8000);return()=>clearInterval(iv);
  },[npcPlayers,gLog]);

  useEffect(()=>{
    var iv=setInterval(()=>{setTimeOfDay(t=>{var next=(t+1)%24;if(next===21)setTimeout(()=>gLog("Night falls.","story"),0);if(next===6)setTimeout(()=>gLog("Dawn breaks.","story"),0);return next;});},60000);
    return()=>clearInterval(iv);
  },[gLog]);

  useEffect(()=>{
    if(!gmPuppet||gmPuppet.mode!=="ambush"||gameView==="combat"||!me)return;
    var npc=npcPlayers.find(n=>n.id===gmPuppet.npcId);if(!npc)return;
    var nc=CLASSES[npc.cls];var lm=npc.level/50+0.5;
    var e={name:npc.name,icon:nc.icon,hp:Math.round(nc.hp*lm),maxHp:Math.round(nc.hp*lm),atk:Math.round(nc.atk*lm),xp:npc.level*40,gold:npc.level*15,desc:"GM Puppet",pvp:true};
    setEncounter({enemies:[e]});setGameView("combat");setCombatTurn("player");setSelectedTargetIdx(0);
    gLog("AMBUSH by "+npc.name+"! (GM Puppet)","system");notify("AMBUSH: "+npc.name+"!","#ff4444");setGmPuppet(null);
  },[gmPuppet,gameView]);

  var checkAch=useCallback((snap)=>{
    if(!snap)return;
    setAchievements(prev=>{
      var next=[...prev];
      var add=(id,name)=>{if(!next.includes(id)){next.push(id);setTimeout(()=>{setNewAchievement({id,name});setTimeout(()=>setNewAchievement(null),4500);},100);}};
      if(snap.kills>=1)add("first_blood","First Blood");
      if(snap.kills>=50)add("kills50","Monster Hunter");
      if(snap.kills>=200)add("kills200","Warlord");if(snap.kills>=500)add("kills500","Death Dealer");
      if(snap.level>=10)add("level10","Seasoned");
      if(snap.level>=25)add("level25","Veteran");
      if(snap.level>=50)add("level50","Legendary");if(snap.level>=75)add("level75","Godlike");
      if(snap.gold>=10000)add("rich","Wealthy Lord");if(snap.gold>=50000)add("rich2","Tycoon");
      if((snap.dungeonsCleared||0)>=1)add("dungeon1","Crawler");
      if((snap.dungeonsCleared||0)>=5)add("dungeon5","Dungeon Master");if((snap.dungeonsCleared||0)>=10)add("dungeon10","Delvemaster");
      if((snap.regionsVisited||[]).length>=10)add("allregions","Cartographer");
      var itemList=[...(snap.inventory||[]),...(snap.equipped||[])];
      if(itemList.some(i=>(ITEMS[i]||{}).tier===3))add("mythic","Mythic Forger");
      return next;
    });
  },[]);

  var advanceQuest=useCallback((id,amount=1)=>{
    setQuests(prev=>prev.map(q=>{
      if(q.id!==id||q.done)return q;
      var p=(q.progress||0)+amount;
      if(p>=(q.goal||1)){
        setTimeout(()=>{
          gLog("Quest done: "+q.name,"system");notify("Quest: "+q.name,"#55cc66");
          // Pay the quest reward
          if(q.reward&&q.reward>0)gainGold(q.reward);
        },0);
        return{...q,done:true,progress:p};
      }
      return{...q,progress:p};
    }));
  },[gLog,notify,gainGold]);

  var startGame=(slot)=>{
    var sl=slot||1;
    deleteSlot(sl);
    var cls=CLASSES[playerClass];var cq=CLASS_QUESTS[playerClass];
    var charData={name:playerName||authUser?.displayName||"Hero",cls:playerClass,level:1,hp:cls.hp,maxHp:cls.hp,mana:cls.mana,maxMana:cls.mana,atk:cls.atk,mag:cls.mag,spd:cls.spd,gold:100,xp:0,xpNext:xpForLevel(1),kills:0,inventory:["Health Potion","Blood Vial","Mana Potion","Mana Elixir"],equipped:[],dungeonsCleared:0,regionsVisited:["Starter Isle"]};
    setMe(charData);
    setSkillPoints(0);setLearnedSkills({});setLearnedSpells([]);setAchievements([]);setParty(null);setDungeon(null);dungeonRef.current=null;
    setActiveSlot(sl);setKillStreak(0);setBannerTurns(0);
    setQuests([...GLOBAL_QUESTS.map(q=>({...q})),{...cq}]);setRegion("Starter Isle");
    enterGame(charData,sl);
  };

  var gainXP=useCallback((amount)=>{
    var actual=Math.round(amount*xpMult*(isNight?1.5:1.0));
    gLog("+"+actual+" XP"+(xpMult>1?" (x"+xpMult+")":isNight?" night":""),"xp");
    setMe(prev=>{
      if(!prev)return prev;
      var newXp=prev.xp+actual,lv=prev.level,gained=0;
      var maxHp=prev.maxHp,maxMana=prev.maxMana,atk=prev.atk,mag=prev.mag;
      while(newXp>=xpForLevel(lv)){newXp-=xpForLevel(lv);lv++;gained++;var g=CLASSES[prev.cls]||{lvHp:50,lvMana:15,lvAtk:5,lvMag:5};maxHp+=g.lvHp;maxMana+=g.lvMana;atk+=g.lvAtk;mag+=g.lvMag;}
      if(gained>0){
        var clsName=prev.cls;
        setTimeout(()=>{
          var g2=CLASSES[clsName]||{lvHp:50,lvAtk:5,lvMag:5,lvMana:20};setLevelUpInfo({newLevel:lv,hpGain:gained*g2.lvHp,atkGain:gained*g2.lvAtk,magGain:gained*g2.lvMag,manaGain:gained*g2.lvMana});
          setSkillPoints(sp=>sp+gained);
          var pool=SPELLS[clsName]||[];
          setLearnedSpells(cur=>{
            var newSpells=pool.filter(s=>s.lvl<=lv&&!cur.includes(s.id));
            if(newSpells.length>0){newSpells.forEach(s=>setTimeout(()=>{gLog("📖 New spell: "+s.name,"system");notify(s.icon+" "+s.name+" unlocked!","#aa88ff");},300));}
            return newSpells.length>0?[...cur,...newSpells.map(s=>s.id)]:cur;
          });
        },0);
      }
      var next={...prev,xp:newXp,xpNext:xpForLevel(lv),level:lv,maxHp,maxMana,atk,mag,hp:Math.min(prev.hp+30,maxHp)};
      setTimeout(()=>checkAch(next),50);return next;
    });
  },[xpMult,isNight,gLog,checkAch]);

  var gainGold=useCallback((amount)=>{
    var thB=(learnedSkills["Treasure Hunter"]||0)*0.30;
    var actual=Math.round(amount*goldMult*(1+thB)*(isDay?1.2:1.0));
    gLog("+"+actual+"g","gold");
    setMe(prev=>{
      if(!prev)return prev;
      var g=prev.gold+actual;
      setQuests(qs=>qs.map(q=>{if(q.id===5&&!q.done&&g>=1000){setTimeout(()=>gLog("Quest: Wealthy!","system"),0);return{...q,done:true};}if(q.id===17&&!q.done&&g>=10000){setTimeout(()=>{gLog("Quest: High Roller!","system");gainGold(q.reward);},0);return{...q,done:true};}return q;}));
      var next={...prev,gold:g};setTimeout(()=>checkAch(next),50);return next;
    });
  },[goldMult,learnedSkills,isDay,gLog,checkAch]);

  var learnSkill=(name)=>{
    var skill=SKILL_TREE[name];var rank=learnedSkills[name]||0;
    if(rank>=skill.maxRank){notify("Max rank!","#5a4030");return;}
    if(skillPoints<skill.cost){notify("Need SP!","#ff5533");return;}
    if(skill.classes&&me&&!skill.classes.includes(me.cls)){notify(me.cls+" can't learn "+name+"!","#ff5533");return;}
    setSkillPoints(sp=>sp-skill.cost);setLearnedSkills(p=>({...p,[name]:rank+1}));
    setMe(prev=>{if(!prev)return prev;
      if(skill.effect==="maxhp")return{...prev,maxHp:prev.maxHp+skill.value,hp:prev.hp+skill.value};
      if(skill.effect==="maxmana")return{...prev,maxMana:prev.maxMana+skill.value,mana:prev.mana+skill.value};
      if(skill.effect==="spd")return{...prev,spd:prev.spd+skill.value};
      return prev;
    });
    gLog(name+" R"+(rank+1)+"!","system");notify("Skill: "+name+" R"+(rank+1),"#aa88ff");
  };

  var upgradeItem=(itemName)=>{
    if(!me)return;
    var path=UPGRADE_PATHS[itemName];if(!path){notify("Not upgradeable!","#5a4030");return;}
    var inv=[...me.inventory];
    if(!inv.includes(itemName)){notify("Not in inventory!","#ff5533");return;}
    if(!inv.includes(path.req)){notify("Need: "+path.req,"#ff5533");return;}
    if(me.gold<path.cost){notify("Need more gold!","#ff5533");return;}
    inv.splice(inv.indexOf(itemName),1);inv.splice(inv.indexOf(path.req),1);
    var equipped=[...(me.equipped||[])];var adj={};
    if(equipped.includes(itemName)){
      var old=ITEMS[itemName]||{};
      if(old.effect==="atk")adj.atk=-old.value;if(old.effect==="mag")adj.mag=-old.value;
      if(old.effect==="spd")adj.spd=-old.value;if(old.effect==="hp")adj.maxHp=-old.value;
      equipped=equipped.filter(e=>e!==itemName);
      var nw=ITEMS[path.to]||{};
      if(nw.effect==="atk")adj.atk=(adj.atk||0)+nw.value;if(nw.effect==="mag")adj.mag=(adj.mag||0)+nw.value;
      if(nw.effect==="spd")adj.spd=(adj.spd||0)+nw.value;if(nw.effect==="hp")adj.maxHp=(adj.maxHp||0)+nw.value;
      equipped.push(path.to);
    }
    inv.push(path.to);
    setMe(prev=>{
      if(!prev)return prev;
      var nm=prev.maxHp+(adj.maxHp||0);
      return{...prev,inventory:inv,equipped,gold:prev.gold-path.cost,atk:prev.atk+(adj.atk||0),mag:prev.mag+(adj.mag||0),spd:prev.spd+(adj.spd||0),maxHp:nm,hp:Math.min(prev.hp,nm)};
    });
    gLog("Upgraded "+itemName+" to "+path.to+"!","system");notify("Upgraded: "+path.to,"#44ffcc");advanceQuest(13);
  };

  var equipItem=(itemName)=>{
    var item=ITEMS[itemName]||{};if(!item||(item.type!=="weapon"&&item.type!=="armor"))return;
    setMe(prev=>{if(!prev)return prev;
      var eq=[...(prev.equipped||[])];var xi=eq.findIndex(e=>(ITEMS[e]||{}).type===item.type);var p={...prev};
      if(xi>=0){var old=ITEMS[eq[xi]]||{};if(old.effect==="atk")p.atk-=old.value;if(old.effect==="mag")p.mag-=old.value;if(old.effect==="spd")p.spd-=old.value;if(old.effect==="hp"){p.maxHp-=old.value;p.hp=Math.min(p.hp,p.maxHp);}eq.splice(xi,1);}
      if(item.effect==="atk")p.atk+=item.value;if(item.effect==="mag")p.mag+=item.value;if(item.effect==="spd")p.spd+=item.value;if(item.effect==="hp"){p.maxHp+=item.value;p.hp+=item.value;}
      eq.push(itemName);return{...p,equipped:eq};
    });
    gLog("Equipped "+itemName,"system");notify("Equipped: "+itemName,"#e8aa44");
  };

  var unequipItem=(itemName)=>{
    var item=ITEMS[itemName]||{};
    setMe(prev=>{if(!prev)return prev;
      var eq=(prev.equipped||[]).filter(e=>e!==itemName);var p={...prev};
      if(item.effect==="atk")p.atk-=item.value;if(item.effect==="mag")p.mag-=item.value;if(item.effect==="spd")p.spd-=item.value;if(item.effect==="hp"){p.maxHp-=item.value;p.hp=Math.min(p.hp,p.maxHp);}
      return{...p,equipped:eq};
    });gLog("Unequipped "+itemName,"system");
  };

  var craftItem=(recipe)=>{
    if(!me)return;
    // Validate materials using current me (for UI check), but apply inside updater to avoid stale closure
    for(var r of recipe.requires){if(!me.inventory.includes(r)){notify("Missing: "+r,"#ff5533");return;}}
    setMe(prev=>{
      if(!prev)return prev;
      var inv=[...prev.inventory];
      for(var r of recipe.requires){var i=inv.indexOf(r);if(i===-1)return prev;inv.splice(i,1);}
      inv.push(recipe.result);return{...prev,inventory:inv};
    });
    gLog("Crafted: "+recipe.name,"gold");notify("Crafted: "+recipe.name,"#44ffcc");advanceQuest(7);advanceQuest(16);
  };

  var getShopBuyList=()=>{
    var base=_optionalChain([REGION_SHOPS, 'access', _3 => _3[region], 'optionalAccess', _4 => _4.buy])||[];
    var gm=gmShopMods.filter(m=>(m.shop==="all"||m.shop===region)&&(m.permanent||Date.now()<m.expiresAt)).map(m=>m.item);
    return[...new Set([...base,...gm])];
  };

  var shopBuy=(itemName)=>{
    var price=_optionalChain([SHOP_PRICES, 'access', _5 => _5[itemName], 'optionalAccess', _6 => _6.buy])||100;if(!me||me.gold<price){notify("Need more gold!","#ff5533");return;}
    setMe(prev=>prev?{...prev,gold:prev.gold-price,inventory:[...prev.inventory,itemName]}:prev);
    gLog("Bought "+itemName+" for "+price+"g","gold");notify("Bought: "+itemName,"#ffd700");
  };

  var shopSell=(itemName)=>{
    var price=_optionalChain([SHOP_PRICES, 'access', _7 => _7[itemName], 'optionalAccess', _8 => _8.sell]);if(!price||!me)return;
    setMe(prev=>{
      if(!prev)return prev;
      var inv=[...prev.inventory];var i=inv.indexOf(itemName);if(i===-1)return prev;inv.splice(i,1);
      return{...prev,gold:prev.gold+price,inventory:inv};
    });
    gLog("Sold "+itemName+" +"+price+"g","gold");notify("+"+price+"g","#ffd700");
  };

  var recruitParty=()=>{
    var rec=PARTY_RECRUITS[region];if(!rec||!me)return;
    if(me.gold<rec.cost){notify("Need "+rec.cost+"g","#ff5533");return;}
    setMe(prev=>prev?{...prev,gold:prev.gold-rec.cost}:prev);setParty({...rec});
    gLog(rec.name+" joined your party!","system");notify("Party: "+rec.name,"#55cc66");advanceQuest(12);
    setAchievements(prev=>prev.includes("party")?prev:[...prev,"party"]);
    setNewAchievement({id:"party",name:"Companions"});setTimeout(()=>setNewAchievement(null),4500);
  };

  var dismissParty=()=>{if(!party)return;gLog(party.name+" left the party.","system");setParty(null);};

  var useItem=(itemName)=>{
    var item=ITEMS[itemName]||{};if(!item||item.type!=="consumable")return;
    setMe(prev=>{if(!prev)return prev;
      var inv=[...prev.inventory];var i=inv.indexOf(itemName);if(i<0)return prev;inv.splice(i,1);
      var hp=prev.hp,mana=prev.mana;
      if(item.effect==="heal")hp=Math.min(prev.maxHp,hp+item.value);
      if(item.effect==="mana")mana=Math.min(prev.maxMana,mana+item.value);
      if(item.effect==="fullheal"){hp=prev.maxHp;mana=prev.maxMana;}
      if(item.effect==="cure"){setTimeout(()=>setPoisoned(false),0);}
      if(item.effect==="revive"){gLog("Phoenix Feather ready — will auto-revive once!","system");}
      if(item.effect==="tome"){
        var pool=SPELLS[prev.cls]||[];var available=pool.filter(s=>!learnedSpells.includes(s.id));
        if(available.length>0){var s=available[0];setLearnedSpells(sp=>[...sp,s.id]);setTimeout(()=>{gLog("📖 Learned: "+s.name,"system");notify(s.icon+" "+s.name+" learned!","#aa88ff");},0);}
        else setTimeout(()=>{gLog("No new spells to learn!","warn");},0);
      }
      if(item.effect==="rage"){setRageTurns(item.value);setTimeout(()=>gLog("RAGE! +50% ATK for "+item.value+" turns","system"),0);}
      if(item.effect==="war_banner"){setBannerTurns(item.value);setTimeout(()=>{gLog("War Banner! +30% ATK/MAG for "+item.value+" turns","system");notify("🚩 War Banner!","#ff8800");},0);}
      if(item.effect==="haste"){setHasteBonus(item.value);setTimeout(()=>gLog("HASTE! +"+item.value+" SPD","system"),0);}
      gLog("Used "+itemName,"system");return{...prev,hp,mana,inventory:inv};
    });setCombatItemOpen(false);
  };

  var useOffensiveItem=(itemName)=>{
    var item=ITEMS[itemName]||{};if(!item||item.type!=="offensive"||!encounter)return;
    var tidx=Math.min(selectedTargetIdx,encounter.enemies.length-1);
    setMe(prev=>{if(!prev)return prev;var inv=[...prev.inventory];var i=inv.indexOf(itemName);if(i===-1)return prev;inv.splice(i,1);return{...prev,inventory:inv};});
    var en=encounter.enemies[tidx];
    if(item.effect==="enemy_thunder"){
      var newHp=Math.max(0,en.hp-50);gLog("Thunder Brew! 50 dmg on "+en.name,"combat");
      setEncounter(prev=>prev?{...prev,enemies:prev.enemies.map((e,i)=>i===tidx?{...e,hp:newHp}:e)}:prev);
      if(newHp<=0){
        setTimeout(()=>{
          resolveKill(en);
          setEncounter(prev=>{
            if(!prev)return null;
            var rem=prev.enemies.filter((_,i)=>i!==tidx);
            if(rem.length>0){setCombatTurn("enemy");setSelectedTargetIdx(0);setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current(rem[0]),900);return{...prev,enemies:rem};}
            handleCombatWin();return null;
          });
        },200);
      } else{setCombatTurn("enemy");setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current({...en,hp:newHp}),900);}
    } else {
      setEncounter(prev=>{if(!prev)return prev;return{...prev,enemies:prev.enemies.map((e,i)=>{
        if(i!==tidx)return e;
        if(item.effect==="enemy_poison")return{...e,poisoned:true,poisonTurns:(e.poisonTurns||0)+item.value};
        if(item.effect==="enemy_blind")return{...e,blinded:true,blindTurns:(e.blindTurns||0)+item.value};
        if(item.effect==="enemy_weaken")return{...e,weakened:true,weakenTurns:(e.weakenTurns||0)+item.value};if(item.effect==="enemy_curse")return{...e,weakened:true,weakenTurns:(e.weakenTurns||0)+item.value,cursed:true};
        if(item.effect==="enemy_freeze")return{...e,frozen:true,frozenTurns:1};
        return e;
      })};});
      // Build updated enemy with status effects applied so enemyTurnFn uses current state
      var updatedEn={...en};
      if(item.effect==="enemy_poison")updatedEn={...updatedEn,poisoned:true,poisonTurns:(en.poisonTurns||0)+item.value};
      else if(item.effect==="enemy_blind")updatedEn={...updatedEn,blinded:true,blindTurns:(en.blindTurns||0)+item.value};
      else if(item.effect==="enemy_weaken"||item.effect==="enemy_curse")updatedEn={...updatedEn,weakened:true,weakenTurns:(en.weakenTurns||0)+item.value};
      else if(item.effect==="enemy_freeze")updatedEn={...updatedEn,frozen:true,frozenTurns:1};
      gLog("Applied "+itemName+" on "+en.name,"combat");
      setCombatTurn("enemy");setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current(updatedEn),900);
    }
    notify("Applied!","#44ffcc");setCombatItemOpen(false);advanceQuest(9);
  };

  var castSpell=useCallback((spellId)=>{
    if(!encounter||combatTurn!=="player"||!me)return;
    var clsSpells=SPELLS[me.cls]||[];
    var spell=clsSpells.find(s=>s.id===spellId);if(!spell)return;
    if(me.mana<spell.cost){gLog("Not enough mana!","warn");return;}
    var magPct=1+(learnedSkills["Spell Mastery"]||0)*0.25+(learnedSkills["Arcane Surge"]||0)*0.18;
    var wm=(WEATHER_EFFECTS[weather]||WEATHER_EFFECTS.clear).playerDmgMult;
    var tidx=Math.min(selectedTargetIdx,encounter.enemies.length-1);
    setMe(prev=>prev?{...prev,mana:Math.max(0,prev.mana-spell.cost)}:prev);
    var spellDmg=()=>Math.round(rnd(Math.round(me.mag*spell.dmg[0]),Math.round(me.mag*spell.dmg[1]))*magPct*wm);
    if(spell.multi){
      var dmg=spellDmg();
      gLog(`${spell.icon} ${spell.name}! ${dmg} dmg × ${encounter.enemies.length} enemies`,"combat");
      var updEnemies=encounter.enemies.map(e=>{
        var hp=Math.max(0,e.hp-dmg);
        var upd={...e,hp};
        if(spell.freeze&&Math.random()<0.5)upd={...upd,frozen:true,frozenTurns:1};
        if(spell.id==="plague")upd={...upd,poisoned:true,poisonTurns:4};
        return upd;
      });
      var killed=updEnemies.filter(e=>e.hp<=0);
      var alive=updEnemies.filter(e=>e.hp>0);
      killed.forEach(k=>{gLog(k.name+" defeated!","system");resolveKill(k);});
      if(spell.drain>0){var total=killed.length*dmg*spell.drain;setMe(prev=>prev?{...prev,hp:Math.min(prev.maxHp,prev.hp+Math.round(total))}:prev);}
      if(alive.length===0){handleCombatWin();}
      else{setEncounter(prev=>({...prev,enemies:alive}));setCombatTurn("enemy");setSelectedTargetIdx(0);setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current(alive[0]),900);}
    } else {
      var enemy=encounter.enemies[tidx];
      var dmg=spellDmg();
      var msg=`${spell.icon} ${spell.name}! ${dmg} dmg on ${enemy.name}`;
      if(spell.drain>0){var healed=Math.round(dmg*spell.drain);setMe(prev=>prev?{...prev,hp:Math.min(prev.maxHp,prev.hp+healed)}:prev);msg+=` (+${healed} HP drained)`;}
      gLog(msg,"combat");
      var updEnemy={...enemy,hp:Math.max(0,enemy.hp-dmg)};
      if(spell.freeze&&Math.random()<0.6)updEnemy={...updEnemy,frozen:true,frozenTurns:1};
      if(spell.id==="plague")updEnemy={...updEnemy,poisoned:true,poisonTurns:4};
      setComboCount(c=>Math.min(c+1,4));
      if(updEnemy.hp<=0){
        gLog(enemy.name+" defeated!","system");resolveKill(enemy);
        var rem=encounter.enemies.filter((_,i)=>i!==tidx);
        if(rem.length>0){setEncounter(prev=>({...prev,enemies:rem}));setCombatTurn("enemy");setSelectedTargetIdx(0);setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current(rem[0]),900);}
        else handleCombatWin();
      } else {
        setEncounter(prev=>({...prev,enemies:prev.enemies.map((e,i)=>i===tidx?updEnemy:e)}));
        setCombatTurn("enemy");setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current(updEnemy),900);
      }
    }
    setSpellCastOpen(false);
  },[encounter,combatTurn,me,learnedSkills,weather,selectedTargetIdx,resolveKill,handleCombatWin,gLog]);

  var rest=()=>{
    if(resting||gameView==="combat"||!me)return;
    var restCost=Math.max(5,Math.floor((me.level||1)*4));
    if(me.gold<restCost){notify("Need "+restCost+"g to rest!","#ff5533");return;}
    setResting(true);setKillStreak(0);gLog("Resting... (-"+restCost+"g)","story");
    setMe(prev=>prev?{...prev,gold:prev.gold-restCost}:prev);
    setTimeout(()=>{
      setMe(prev=>prev?{...prev,mana:prev.maxMana,hp:Math.min(prev.maxHp,prev.hp+Math.round(prev.maxHp*0.35))}:prev);
      setPoisoned(false);setBannerTurns(0);setResting(false);
      gLog("Rested! +35% HP, full Mana.","system");notify("Rested!","#55cc66");
    },1600);
  };

  var enterDungeon=()=>{
    if(gameView==="combat")return;var d=genDungeon(region);if(!d){notify("No dungeon here!","#ff5533");return;}
    setDungeon(d);dungeonRef.current=d;setGameView("dungeon");
    gLog("Entered dungeon: "+d.name,"system");notify("Dungeon: "+d.name,"#e8aa44");
  };

  var enterDungeonRoom=(room)=>{
    var d=dungeonRef.current;if(!d||!room)return;
    if(room.type==="combat"||room.type==="boss"){
      var reg=REGIONS[d.region];
      var mobName,mobTemplate;
      if(room.type==="boss"){
        mobName=d.boss;mobTemplate=MOB_TEMPLATES[mobName]||MOB_TEMPLATES["Goblin King"];
      } else {
        mobName=reg.mobs[rnd(0,reg.mobs.length-1)];mobTemplate=MOB_TEMPLATES[mobName]||MOB_TEMPLATES["Goblin"];
      }
      var em=isNight?1.2:1.0;
      var mob={...mobTemplate,name:mobName,hp:Math.round(mobTemplate.hp*em),maxHp:Math.round(mobTemplate.hp*em),atk:Math.round(mobTemplate.atk*em)};
      setEncounter({enemies:[mob]});setGameView("combat");setCombatTurn("player");setSelectedTargetIdx(0);
      gLog((room.type==="boss"?"BOSS: ":"")+mobName+" appears!","combat");
    } else if(room.type==="treasure"){
      var gold=rnd(d.reward*0.1,d.reward*0.25);gainGold(gold);
      if(rnd(1,2)===1){var k=Object.keys(ITEMS);var it=k[rnd(0,k.length-1)];setMe(p=>p?{...p,inventory:[...p.inventory,it]}:p);gLog("Treasure room! +"+gold+"g + "+it,"gold");}
      else gLog("Treasure room! +"+gold+"g","gold");
      notify("Treasure!","#ffd700");advanceQuest(4);
      var nextIdx=d.roomIdx+1;
      if(nextIdx>=d.rooms.length){setDungeon(null);dungeonRef.current=null;setGameView("world");gainGold(d.reward);setMe(prev=>{if(!prev)return prev;var next={...prev,dungeonsCleared:(prev.dungeonsCleared||0)+1};setTimeout(()=>checkAch(next),100);return next;});setDungeonComplete({name:d.name,reward:d.reward});advanceQuest(11);}
      else{var upd={...d,rooms:d.rooms.map((r,i)=>i===d.roomIdx?{...r,done:true}:r),roomIdx:nextIdx};setDungeon(upd);dungeonRef.current=upd;}
    } else if(room.type==="rest"){
      setMe(prev=>prev?{...prev,hp:Math.min(prev.maxHp,prev.hp+Math.round(prev.maxHp*0.3)),mana:prev.maxMana}:prev);
      gLog("Rest room! Restored 30% HP and full Mana.","system");notify("Rested!","#55cc66");
      var nextIdx=d.roomIdx+1;
      if(nextIdx>=d.rooms.length){setDungeon(null);dungeonRef.current=null;setGameView("world");}
      else{var upd={...d,rooms:d.rooms.map((r,i)=>i===d.roomIdx?{...r,done:true}:r),roomIdx:nextIdx};setDungeon(upd);dungeonRef.current=upd;}
    }
  };

  var handleCombatWin=useCallback(()=>{
    setEncounter(null);setCombatTurn("player");setShielded(false);setPoisoned(false);setStunned(false);
    setSelectedTargetIdx(0);setRageTurns(0);setHasteBonus(0);setCombatItemOpen(false);
    var d=dungeonRef.current;
    if(d){
      var nextIdx=d.roomIdx+1;
      if(nextIdx>=d.rooms.length){
        setDungeon(null);dungeonRef.current=null;setGameView("world");gainGold(d.reward);
        setMe(prev=>{if(!prev)return prev;var next={...prev,dungeonsCleared:(prev.dungeonsCleared||0)+1};setTimeout(()=>checkAch(next),100);return next;});
        setDungeonComplete({name:d.name,reward:d.reward});advanceQuest(11);advanceQuest(15);
        gLog("DUNGEON CLEARED: "+d.name,"system");
      } else {
        var upd={...d,rooms:d.rooms.map((r,i)=>i===d.roomIdx?{...r,done:true}:r),roomIdx:nextIdx};
        setDungeon(upd);dungeonRef.current=upd;setGameView("dungeon");
      }
    } else {
      setGameView("world");
      // Track "win 30 combats" quest per actual combat win (not per kill)
      advanceQuest(19);
    }
  },[gainGold,checkAch,advanceQuest]);

  var resolveKill=useCallback((killedEnemy)=>{
    var newStreak=killStreak+1;
    setKillStreak(newStreak);
    if(newStreak===5){setTimeout(()=>{notify("🔥 5-Kill Streak! +20% XP bonus!","#ff8800");gLog("5-Kill Streak! Bonus XP!","system");},0);}
    if(newStreak===10){setTimeout(()=>{notify("💀 10-Kill Streak! +40% XP!","#ff2200");gLog("10-Kill Streak! Major Bonus!","system");},0);}
    var streakBonus=newStreak>=10?1.4:newStreak>=5?1.2:1.0;
    gainXP(Math.round(killedEnemy.xp*streakBonus));gainGold(killedEnemy.gold);
    if(learnedSkills["Regeneration"]){setMe(prev=>prev?{...prev,hp:Math.min(prev.maxHp,prev.hp+10)}:prev);setTimeout(()=>gLog("Regen +10 HP","system"),0);}
    var dropBase=0.10+(regData?regData.danger-1:0)*0.018;
    if(Math.random()<Math.min(0.40,dropBase)){
      var droppable=Object.keys(ITEMS).filter(k=>ITEMS[k].type!=="weapon"&&ITEMS[k].type!=="armor"&&ITEMS[k].type!=="material");
      var it=droppable[rnd(0,droppable.length-1)];
      setMe(prev=>prev?{...prev,inventory:[...prev.inventory,it]}:prev);
      setTimeout(()=>gLog("Drop: "+it,"gold"),0);
    }
    setQuests(prev=>prev.map(q=>{
      if(q.id===1&&!q.done){setTimeout(()=>{gLog("Quest: First Steps","system");gainGold(q.reward);},0);return{...q,done:true};}
      if(q.id===2&&killedEnemy.name==="Goblin"&&!q.done){var p=(q.progress||0)+1;if(p>=q.goal){setTimeout(()=>gLog("Quest: Goblin Slayer","system"),0);gainGold(q.reward);return{...q,done:true,progress:p};}return{...q,progress:p};}
      if(q.id===14&&!q.done){var p=(q.progress||0)+1;if(p>=q.goal){setTimeout(()=>{gLog("Quest: Elite Hunter!","system");gainGold(q.reward);},0);return{...q,done:true,progress:p};}return{...q,progress:p};}
      // Quest 19 (Survivor: win 30 combats) is tracked in handleCombatWin, not per-kill
      if(q.id===6&&!q.done&&(killedEnemy.name==="Drake"||killedEnemy.name==="Ancient Dragon")){setTimeout(()=>{gLog("Quest: Dragon Slayer","system");gainGold(q.reward);},0);setAchievements(prev=>prev.includes("dragon")?prev:[...prev,"dragon"]);return{...q,done:true};}
      if(q.id===8&&!q.done&&isNight){var p=(q.progress||0)+1;if(p>=q.goal){setTimeout(()=>gLog("Quest: Night Fighter","system"),0);gainGold(q.reward);return{...q,done:true,progress:p};}return{...q,progress:p};}
      if(q.id===18&&!q.done&&isNight){var p=(q.progress||0)+1;if(p>=q.goal){setTimeout(()=>{gLog("Quest: Night Stalker!","system");gainGold(q.reward);},0);return{...q,done:true,progress:p};}return{...q,progress:p};}
      return q;
    }));
    setMe(prev=>{if(!prev)return prev;var next={...prev,kills:prev.kills+1};setTimeout(()=>checkAch(next),100);return next;});
    setGmBounties(prev=>prev.map(b=>{if(b.done||b.type!=="kills")return b;var p=(b.progress||0)+1;if(p>=b.goal){setTimeout(()=>{gLog("Bounty: "+b.name,"system");notify("Bounty: "+b.name,"#ffd700");},0);return{...b,done:true,progress:p};}return{...b,progress:p};}));
  },[gainXP,gainGold,learnedSkills,isNight,gLog,checkAch,notify,killStreak]);

  var enemyTurnFnRef=useRef(null);
  var enemyTurnFn=useCallback((enemy)=>{
    setEncounter(prev=>{
      if(!prev)return prev;
      var eidx=prev.enemies.findIndex(e=>e===enemy||e.name===enemy.name);
      var targetIdx=eidx>=0?eidx:0;
      var e={...prev.enemies[targetIdx]};var pdmg=0;
      if(e.poisoned&&e.poisonTurns>0){pdmg=20;e.poisonTurns--;if(e.poisonTurns<=0)e.poisoned=false;setTimeout(()=>gLog(e.name+" poison -20","combat"),0);}
      if(e.blinded&&e.blindTurns>0){e.blindTurns--;if(e.blindTurns<=0){e.blinded=false;}}
      if(e.weakened&&e.weakenTurns>0){e.weakenTurns--;if(e.weakenTurns<=0)e.weakened=false;}
      if(e.frozen&&e.frozenTurns>0){e.frozenTurns--;if(e.frozenTurns<=0)e.frozen=false;}
      if(pdmg>0){var hp=Math.max(0,e.hp-pdmg);e.hp=hp;if(hp<=0){setTimeout(()=>{resolveKill(e);var rem=prev.enemies.filter((_,i)=>i!==targetIdx);if(rem.length>0){setEncounter(p=>p?{...p,enemies:rem}:p);setCombatTurn("player");setSelectedTargetIdx(0);}else handleCombatWin();},0);return{...prev,enemies:prev.enemies.map((x,i)=>i===targetIdx?e:x)};}}
      if(e.frozen){setTimeout(()=>{gLog(e.name+" FROZEN - skips turn","combat");setCombatTurn("player");},150);return{...prev,enemies:prev.enemies.map((x,i)=>i===targetIdx?e:x)};}
      return{...prev,enemies:prev.enemies.map((x,i)=>i===targetIdx?e:x)};
    });
    setTimeout(()=>{
      if(!encounterRef.current)return;
      setMe(prev=>{
        if(!prev)return prev;
        var ec=activeEvents.includes("eclipse");
        var dmg=rnd(Math.round(enemy.atk*0.8),Math.round(enemy.atk*1.2));
        if(ec)dmg=Math.round(dmg*1.3);if(isNight)dmg=Math.round(dmg*1.2);if(enemy.weakened)dmg=Math.round(dmg*0.7);var bh=(learnedSkills["Battle Hardened"]||0)*0.05;if(bh>0)dmg=Math.round(dmg*(1-bh));
        dmg=Math.round(dmg*(WEATHER_EFFECTS[weather]||WEATHER_EFFECTS.clear).enemyDmgMult);
        var dodge=Math.min(0.50,(prev.spd+hasteBonus)/500+(WEATHER_EFFECTS[weather]||WEATHER_EFFECTS.clear).dodgeBonus+(enemy.blinded?0.25:0));
        if(Math.random()<dodge){setTimeout(()=>gLog("Dodged! ("+Math.round(dodge*100)+"%)","combat"),0);setCombatTurn("player");return prev;}
        if((learnedSkills["Mana Shield"]||0)>0&&Math.random()<0.15){setTimeout(()=>gLog("Mana Shield negated hit!","combat"),0);setCombatTurn("player");return prev;}
        if(shielded){setTimeout(()=>gLog("Shield blocked "+enemy.name+"!","combat"),0);setShielded(false);setCombatTurn("player");setQuests(qs=>qs.map(q=>{if(q.id===10&&!q.done&&prev.cls==="Paladin"){var p=(q.progress||0)+1;if(p>=q.goal){setTimeout(()=>gLog("Quest: Holy Warrior","system"),0);return{...q,done:true,progress:p};}return{...q,progress:p};}return q;}));return prev;}
        var newHp=Math.max(0,prev.hp-dmg);
        setComboCount(0);
        if(poisoned){newHp=Math.max(0,newHp-20);setTimeout(()=>gLog("Poison -20 HP","warn"),0);}
        if(!poisoned&&enemy.poisonChance&&Math.random()<enemy.poisonChance){setPoisoned(true);setTimeout(()=>gLog(enemy.name+" poisons you!","warn"),0);}
        if(party&&Math.random()<0.1){var sd=rnd(5,Math.round(enemy.atk*0.3));setParty(p=>p?{...p,hp:Math.max(0,p.hp-sd)}:p);}
        setTimeout(()=>gLog(enemy.name+" hits for "+dmg+(ec?" (Eclipse!)":isNight?" night":"")+(enemy.weakened?" (weak)":""),"combat"),0);
        if(newHp<=0){var gl=Math.min(50,prev.gold);setTimeout(()=>{setDeathScreen({killer:enemy.name,kills:prev.kills,level:prev.level,region,goldLost:gl});handleCombatWin();setRegion("Starter Isle");setDungeon(null);dungeonRef.current=null;setKillStreak(0);},0);return{...prev,hp:Math.round(prev.maxHp*0.5),gold:Math.max(0,prev.gold-gl)};}
        setCombatTurn("player");return{...prev,hp:newHp,mana:Math.min(prev.maxMana,prev.mana+6)};
      });
    },150);
  },[activeEvents,weather,isNight,shielded,poisoned,learnedSkills,hasteBonus,party,region,handleCombatWin,resolveKill,gLog]);

  useEffect(()=>{enemyTurnFnRef.current=enemyTurnFn;},[enemyTurnFn]);

  var playerAttack=(type)=>{
    if(!encounter||combatTurn!=="player"||!me)return;
    var tidx=Math.min(selectedTargetIdx,encounter.enemies.length-1);
    var enemy=encounter.enemies[tidx];if(!enemy||enemy.hp<=0)return;
    var cls=CLASSES[me.cls];
    var bannerBoost=bannerTurns>0?1.30:1.0;
    var atkPct=(1+(learnedSkills["Power Strike"]||0)*0.20)*bannerBoost;
    var magPct=(1+(learnedSkills["Spell Mastery"]||0)*0.25)*bannerBoost;
    var critCh=(learnedSkills["Lucky Strike"]||0)*0.20;
    var wm=(WEATHER_EFFECTS[weather]||WEATHER_EFFECTS.clear).playerDmgMult;
    var rage=rageTurns>0?1.5:1.0;
    var dmg=0,msg="",newMana=me.mana;

    if(type==="attack"){
      if(cls.attackIsMag){
        dmg=Math.round(rnd(Math.round(me.mag*0.80),Math.round(me.mag*1.05))*magPct*wm*comboMult);
        var isMage=me.cls==="Mage";
        var lbl=isMage?"Magic Bolt ✨":"Shadow Bolt 💜";
        if(Math.random()<critCh){dmg=Math.round(dmg*1.8);msg="CRITICAL "+lbl+"! "+dmg+" magic dmg on "+enemy.name;}
        else msg=lbl+": "+dmg+" magic dmg on "+enemy.name;
        if(me.cls==="Necromancer"){var steal=Math.round(dmg*0.15);setMe(prev=>prev?{...prev,hp:Math.min(prev.maxHp,prev.hp+steal)}:prev);}
      } else if(me.cls==="Paladin"){
        var holyDmg=Math.round((me.atk*0.65+me.mag*0.35)*rnd(90,110)/100*atkPct*wm*comboMult);
        dmg=holyDmg;
        if(Math.random()<critCh){dmg=Math.round(dmg*2);msg="HOLY CRIT! "+dmg+" holy dmg on "+enemy.name;}
        else msg="Holy Strike: "+dmg+" holy dmg on "+enemy.name;
      } else {
        dmg=Math.round(rnd(Math.round(me.atk*0.85),Math.round(me.atk*1.15))*atkPct*wm*rage*comboMult);
        var comboLabel=comboCount>=4?"💥 MAX COMBO!":comboCount>=3?"🔥 COMBO x"+(comboCount+1)+"!":comboCount>=2?"⚡ COMBO x"+(comboCount+1):comboCount>=1?"COMBO x"+(comboCount+1):"";
        if(Math.random()<critCh){dmg=Math.round(dmg*2);msg="CRITICAL! "+dmg+" dmg on "+enemy.name+(comboLabel?" "+comboLabel:"");}
        else msg="You hit "+enemy.name+" for "+dmg+(rage>1?" 🔴RAGE":"")+(comboLabel?" "+comboLabel:"");
        if(rageTurns>0)setRageTurns(r=>r-1);if(learnedSkills["Vampiric Touch"]&&dmg>0){var vl=Math.round(dmg*0.08);setMe(pp=>pp?{...pp,hp:Math.min(pp.maxHp,pp.hp+vl)}:pp);}
      }
      if(learnedSkills["Second Wind"]&&Math.random()<0.20){setMe(pp=>pp?{...pp,hp:Math.min(pp.maxHp,pp.hp+60)}:pp);setTimeout(()=>gLog("Second Wind! +60 HP","system"),0);}
      var momBonus=1+(learnedSkills["Momentum"]||0)*0.08*comboCount;
      if(momBonus>1&&dmg>0)dmg=Math.round(dmg*momBonus);
      setComboCount(c=>Math.min(c+1,4));

    } else if(type==="ability"){
      if(me.mana<cls.abilityCost){gLog("Not enough mana!","warn");return;}
      newMana=me.mana-cls.abilityCost;

      if(me.cls==="Warrior"){
        dmg=Math.round(me.atk*1.2*atkPct*wm);
        setStunned(true);
        msg="⚔️ Shield Bash! "+enemy.name+" STUNNED! "+dmg+" dmg";
        advanceQuest(10);

      } else if(me.cls==="Mage"){
        dmg=Math.round(rnd(Math.round(me.mag*1.2),Math.round(me.mag*1.6))*magPct*wm);
        msg="🔥 Fireball! "+dmg+" fire dmg on "+enemy.name;
        advanceQuest(10,dmg);

      } else if(me.cls==="Rogue"){
        dmg=Math.round(me.atk*2.8*atkPct*wm);
        msg="🗡️ BACKSTAB "+enemy.name+"! "+dmg+" dmg (CRIT + armor pierce)";
        advanceQuest(10);

      } else if(me.cls==="Paladin"){
        setShielded(true);
        var heal=Math.round(me.mag*1.0);
        dmg=Math.round((me.atk*0.65+me.mag*0.35)*atkPct*wm);
        // Apply heal+mana in the shared final setMe below (newMana already set)
        // Store heal to be applied in the combined setMe at end of playerAttack
        msg="🛡️ Holy Shield! +"+heal+" HP healed. "+dmg+" holy dmg.";

      } else if(me.cls==="Ranger"){
        var vd=Math.round(me.atk*1.9*atkPct*wm);
        var ne=encounter.enemies.map(e=>({...e,hp:Math.max(0,e.hp-vd)}));
        var killed=ne.filter(e=>e.hp<=0);var surv=ne.filter(e=>e.hp>0);
        gLog("🏹 Volley! "+encounter.enemies.length+" targets ×"+vd+" each","combat");
        killed.forEach(k=>{gLog(k.name+" defeated!","system");resolveKill(k);});
        if(encounter.enemies.length>=2)advanceQuest(10);
        var fs=surv;
        if(party&&party.hp>0&&surv.length>0){var ad=rnd(Math.round(party.atk*0.6),party.atk);fs=surv.map((e,i)=>i===0?{...e,hp:Math.max(0,e.hp-ad)}:e);var ak=fs.filter(e=>e.hp<=0);fs=fs.filter(e=>e.hp>0);ak.forEach(k=>{resolveKill(k);});}
        setMe(prev=>prev?{...prev,mana:Math.min(prev.maxMana,newMana+5)}:prev);
        if(fs.length===0)handleCombatWin();
        else{setEncounter(prev=>({...prev,enemies:fs}));setCombatTurn("enemy");setSelectedTargetIdx(0);setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current(fs[0]),900);}
        return;

      } else if(me.cls==="Necromancer"){
        dmg=Math.round(rnd(Math.round(me.mag*1.1),Math.round(me.mag*1.5))*magPct*wm);
        var drain=Math.round(dmg*0.70);
        setMe(prev=>prev?{...prev,hp:Math.min(prev.maxHp,prev.hp+drain)}:prev);
        msg="💀 Death Drain! "+dmg+" dmg — stole "+drain+" HP";
        advanceQuest(10,drain);
      }

    } else if(type==="flee"){
      setComboCount(0);
      if(rnd(1,2)===1){gLog("You fled!","warn");handleCombatWin();}
      else{gLog("Couldn't escape!","warn");setCombatTurn("enemy");setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current(encounter.enemies[0]),800);}
      return;
    }

    setMe(prev=>prev?{...prev,mana:Math.min(prev.maxMana,newMana+6),hp:Math.min(prev.maxHp,prev.hp+(typeof heal==="number"&&me.cls==="Paladin"?heal:0))}:prev);
    if(bannerTurns>0)setBannerTurns(b=>Math.max(0,b-1));
    var finalHp=Math.max(0,enemy.hp-dmg);
    if(msg)gLog(msg,"combat");
    var allyDmg=0;
    if(party&&party.hp>0&&finalHp>0){allyDmg=rnd(Math.round(party.atk*0.6),party.atk);gLog(party.name+" hits "+enemy.name+" for "+allyDmg,"combat");}
    finalHp=Math.max(0,finalHp-allyDmg);

    if(finalHp<=0){
      gLog(enemy.name+" defeated!","system");resolveKill(enemy);
      var rem=encounter.enemies.filter((_,i)=>i!==tidx);
      if(rem.length>0){gLog(rem[0].name+" advances!","combat");setEncounter(prev=>({...prev,enemies:rem}));setCombatTurn("enemy");setSelectedTargetIdx(0);setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current(rem[0]),900);}
      else handleCombatWin();
    } else {
      var upd=encounter.enemies.map((e,i)=>i===tidx?{...e,hp:finalHp}:e);
      setEncounter(prev=>({...prev,enemies:upd}));
      if(stunned){gLog(enemy.name+" stunned - skips turn!","combat");setStunned(false);setCombatTurn("player");return;}
      setCombatTurn("enemy");setTimeout(()=>enemyTurnFnRef.current&&enemyTurnFnRef.current({...enemy,hp:finalHp}),900);
    }
  };

  var travelTo=(dest)=>{
    if(gameView==="combat")return;
    if(lockedRegions.includes(dest)){notify(dest+" is LOCKED by GM!","#ff4444");gLog("GM locked "+dest,"warn");return;}
    var req=_optionalChain([REGIONS, 'access', _9 => _9[dest], 'optionalAccess', _10 => _10.minLevel])||1;
    if(me&&me.level<req){notify("Level "+req+" required!","#ff5533");return;}
    setRegion(dest);setGameView("world");setDungeon(null);dungeonRef.current=null;
    gLog("Traveled to "+dest,"story");notify("Arrived: "+dest,"#e8aa44");
    setQuests(prev=>prev.map(q=>{
      if(q.id===3&&!q.done){var vis=[...new Set([...(q.visited||[]),dest])];if(vis.length>=q.goal){setTimeout(()=>{gLog("Quest: Explorer","system");gainGold(q.reward);},0);return{...q,done:true,visited:vis};}return{...q,visited:vis};}return q;
    }));
    setMe(prev=>{if(!prev)return prev;var rv=[...new Set([...(prev.regionsVisited||[]),dest])];var next={...prev,regionsVisited:rv};setTimeout(()=>checkAch(next),50);return next;});
  };

  var explore=()=>{
    if(exploring||gameView==="combat"||resting)return;setExploring(true);gLog("Exploring "+region+"...","story");
    setTimeout(()=>{
      setExploring(false);var reg=REGIONS[region];var w=WEATHER_EFFECTS[weather]||WEATHER_EFFECTS.clear;
      var eff=Math.min(95,spawnRate+w.spawnMod+(isNight?20:0));var roll=rnd(1,100);
      var bossEv=activeEvents.map(id=>WORLD_EVENTS.find(e=>e.id===id)).find(ev=>_optionalChain([ev, 'optionalAccess', _11 => _11.boss]));
      if(activeEvents.includes("war")&&pvpEnabled&&rnd(1,100)<=40){
        var on=npcPlayers.filter(n=>n.status==="online");if(on.length){var n=on[rnd(0,on.length-1)];var nc=CLASSES[n.cls];var lm=n.level/50+0.5;var e={name:n.name,icon:nc.icon,hp:Math.round(nc.hp*lm),maxHp:Math.round(nc.hp*lm),atk:Math.round(nc.atk*lm),xp:n.level*40,gold:n.level*15,desc:"PvP",pvp:true};setEncounter({enemies:[e]});setGameView("combat");setCombatTurn("player");setSelectedTargetIdx(0);gLog("PvP! "+n.name+" attacks!","system");return;}
      }
      if(bossEv&&rnd(1,100)<=40){var bt=MOB_TEMPLATES[bossEv.boss]||MOB_TEMPLATES["Goblin"];setEncounter({enemies:[{...bt,name:bossEv.boss||"Unknown Boss",maxHp:bt.hp}]});setGameView("combat");setCombatTurn("player");setSelectedTargetIdx(0);gLog("EVENT BOSS: "+bossEv.boss,"system");return;}
      if(roll<=eff){
        var mn=reg.mobs[rnd(0,reg.mobs.length-1)];var t=MOB_TEMPLATES[mn]||MOB_TEMPLATES["Goblin"];
        var em=activeEvents.includes("eclipse")?1.5:isNight?1.2:1.0;
        var mob={...t,name:mn,hp:Math.round(t.hp*em),maxHp:Math.round(t.hp*em),atk:Math.round(t.atk*em)};
        var enemies=[mob];
        if(reg.danger>=3&&rnd(1,100)<=(reg.danger>=6?55:30)){var m2n=reg.mobs[rnd(0,reg.mobs.length-1)];var t2=MOB_TEMPLATES[m2n]||MOB_TEMPLATES["Goblin"];var m2={...t2,name:m2n,hp:Math.round(t2.hp*em),maxHp:Math.round(t2.hp*em),atk:Math.round(t2.atk*em)};enemies=[mob,m2];gLog("Two enemies: "+mob.name+" + "+m2n,"combat");}
        else gLog(mn+" appears! "+t.desc,"combat");
        setEncounter({enemies});setGameView("combat");setCombatTurn("player");setSelectedTargetIdx(0);
      } else if(roll<=eff+20){
        var evRoll=rnd(1,100);
        if(evRoll<=18){
          var pool=[...WANDERER_POOL].sort(()=>Math.random()-0.5).slice(0,4);
          setRandomEvent({type:"wanderer",items:pool});
          gLog("A wandering merchant appears!","gold");notify("🛒 Wandering Merchant!","#ffd700");
        } else if(evRoll<=36){
          var buffs=[...SHRINE_BUFFS].sort(()=>Math.random()-0.5).slice(0,3);
          setRandomEvent({type:"shrine",buffs});
          gLog("You find a hidden shrine...","story");notify("🕌 Hidden Shrine!","#aa88ff");
        } else {
          gainGold(rnd(reg.danger*5,reg.danger*25));gLog("Treasure chest!","gold");
          if(rnd(1,3)===1){var k=Object.keys(ITEMS);var it=k[rnd(0,k.length-1)];setMe(p=>p?{...p,inventory:[...p.inventory,it]}:p);gLog("Also found: "+it,"gold");}
          notify("Treasure!","#ffd700");advanceQuest(4);
        }
      } else {
        var fl=["Path is quiet.","Old footprints found.","A bird watches.","Something moved, then vanished.","Distant battle cries.","The wind whispers."];
        gLog(fl[rnd(0,fl.length-1)],"story");
      }
    },900);
  };

  // ── AUTH + GLOBAL SERVER FUNCTIONS ───────────────────────

  // Watch Firebase auth state on mount
  useEffect(()=>{
    var authTimeout=null;
    var unsub=null;

    function setupAuthListener(){
      if(!_fbEnabled||!_fbAuth){setAuthLoading(false);setFbStatus("offline");return;}
      setFbStatus("connected");
      // Safety fallback: if onAuthStateChanged never fires (network/cold-start),
      // force-dismiss the loading screen after 8 seconds so users aren't stuck.
      authTimeout=setTimeout(()=>{setAuthLoading(false);},8000);
      unsub=_fbAuth.onAuthStateChanged(user=>{
        if(authTimeout){clearTimeout(authTimeout);authTimeout=null;}
        setAuthLoading(false);
        if(user){
          setAuthUser(user);setMyUid(user.uid);
          fbOnce('users/'+user.uid).then(profile=>{
            if(profile){
              setPlayerName(profile.username||user.displayName||"Hero");
              setPlayerClass(profile.cls||"Warrior");
            }
          });
          // Transition to char creation / save slot screen after auth
          setScreen("create");
        } else {
          setAuthUser(null);setMyUid(null);setScreen("auth");
        }
      });
    }

    setupAuthListener();
    // Register retry callback so window.load firebase retry can re-subscribe
    window._fbAuthRetryCallback=function(){
      if(unsub)unsub();
      if(authTimeout)clearTimeout(authTimeout);
      setupAuthListener();
    };
    return ()=>{
      window._fbAuthRetryCallback=null;
      if(authTimeout)clearTimeout(authTimeout);
      if(unsub)unsub();
    };
  },[]);
  useEffect(()=>{if(!authLoading&&!authUser&&screen!=="auth")setScreen("auth");},[authLoading,authUser,screen]);

  var doRegister=useCallback(()=>{
    if(!_fbAuth){setAuthError("Firebase is not available. Check your connection and reload.");return;}
    if(!authUsername.trim()||authUsername.trim().length<3){setAuthError("Username must be at least 3 characters.");return;}
    if(!authEmail.trim()||!authPassword||authPassword.length<6){setAuthError("Valid email and password (6+ chars) required.");return;}
    setAuthError("");setAuthLoading(true);
    _fbAuth.createUserWithEmailAndPassword(authEmail.trim(),authPassword)
      .then(cred=>{
        var uid=cred.user.uid;
        var profileUpdate=_fbAuth.currentUser
          ? _fbAuth.currentUser.updateProfile({displayName:authUsername.trim()})
          : Promise.resolve();
        return profileUpdate.then(()=>{
          // Guard: fbRef returns null if Firebase DB is not enabled
          var ref=fbRef('users/'+uid);
          if(ref) return ref.set({username:authUsername.trim(),email:authEmail.trim(),cls:"Warrior",level:1,createdAt:Date.now()});
        });
      })
      .catch(e=>{setAuthLoading(false);setAuthError(e.message);});
  },[authEmail,authPassword,authUsername]);

  var doLogin=useCallback(()=>{
    if(!_fbAuth){setAuthError("Firebase is not available. Check your connection and reload.");return;}
    if(!authEmail.trim()||!authPassword){setAuthError("Enter email and password.");return;}
    setAuthError("");setAuthLoading(true);
    _fbAuth.signInWithEmailAndPassword(authEmail.trim(),authPassword)
      .catch(e=>{setAuthLoading(false);setAuthError(e.message);});
  },[authEmail,authPassword]);

  var doLogout=useCallback(()=>{
    if(myUid&&_fbEnabled)fbSet('global/players/'+myUid+'/online',false);
    _fbAuth&&_fbAuth.signOut();
    // Reset all game state so stale combat/dungeon state doesn't linger on re-login
    setScreen("auth");setMe(null);setMyUid(null);setAuthUser(null);
    setEncounter(null);setDungeon(null);dungeonRef.current=null;
    setCombatTurn("player");setShielded(false);setPoisoned(false);setStunned(false);
    setRageTurns(0);setHasteBonus(0);setExploring(false);setResting(false);
    setGameView("world");setParty(null);setNotification(null);setAnnouncement(null);setWhisper(null);
  },[myUid]);

  // Enter game (called after char creation)
  var enterGame=useCallback((charData,slot)=>{
    setActiveSlot(slot||1);setScreen("game");
    setTutorialStep(0);setTutorialDone(false);
    // save profile cls to firebase
    if(myUid&&_fbEnabled)fbUpdate('users/'+myUid,{cls:charData.cls,username:charData.name,level:charData.level||1});
    setTimeout(()=>{
      gLog(charData.name+" the "+charData.cls+" enters Etherion!","system");
      gLog("One global server. Everyone shares the same world.","story");
    },80);
  },[myUid,gLog]);

  // Sync my presence → /global/players/{uid}
  useEffect(()=>{
    if(!me||!myUid||!_fbEnabled)return;
    var t=setTimeout(()=>{
      var presenceRef=_fbDb.ref('global/players/'+myUid);
      presenceRef.set({name:me.name,cls:me.cls,level:me.level,hp:me.hp,maxHp:me.maxHp,gold:me.gold,kills:me.kills||0,region,online:true,lastSeen:Date.now()});
      // Server-side disconnect handler — sets online:false if tab closes/crashes
      presenceRef.child('online').onDisconnect().set(false);
    },800);
    return()=>clearTimeout(t);
  },[me,myUid,region]);

  // Listen to all online players
  useEffect(()=>{
    if(!_fbEnabled)return;
    var off=fbOn('global/players',data=>{if(data)setOnlinePlayers(data);else setOnlinePlayers({});});
    return off;
  },[]);

  // Listen to shared world state (weather, events, etc.)
  useEffect(()=>{
    if(!_fbEnabled)return;
    var off=fbOn('global/world',data=>{
      if(!data)return;
      if(data.weather!==undefined)setWeather(data.weather);
      if(data.xpMult!==undefined)setXpMult(data.xpMult);
      if(data.goldMult!==undefined)setGoldMult(data.goldMult);
      if(data.pvpEnabled!==undefined)setPvpEnabled(data.pvpEnabled);
      if(data.lockedRegions)setLockedRegions(data.lockedRegions);
      if(data.announcement){setAnnouncement(data.announcement);setTimeout(()=>setAnnouncement(a=>a&&a.text===data.announcement.text?null:a),30000);}
    });
    return off;
  },[]);

  // Listen to GM commands
  useEffect(()=>{
    if(!myUid||!_fbEnabled)return;
    var r=fbRef('global/gmCommands');if(!r)return;
    var handler=(snap)=>{
      var cmds=snap.val();if(!cmds)return;
      Object.entries(cmds).forEach(([cmdId,cmd])=>{
        if(!cmd||cmd.ts<(Date.now()-60000))return;
        if(cmd.pb&&cmd.pb[myUid])return;
        if(cmd.target!=='all'&&cmd.target!==myUid)return;
        if(cmd.type==='give_item'){setMe(p=>p?{...p,inventory:[...p.inventory,cmd.payload.item]}:p);setTimeout(()=>{notify("📦 GM: "+cmd.payload.item,"#44aaff");gLog("GM gave: "+cmd.payload.item,"system");},0);}
        if(cmd.type==='set_stat'){setMe(p=>p?{...p,...cmd.payload}:p);setTimeout(()=>notify("⚡ Stats updated!","#3dd68c"),0);}
        if(cmd.type==='announce'){setAnnouncement(cmd.payload);}
        if(cmd.type==='whisper'){setWhisper(cmd.payload);setTimeout(()=>setWhisper(null),8000);}
        if(cmd.type==='heal_all'){setMe(p=>p?{...p,hp:p.maxHp,mana:p.maxMana}:p);setPoisoned(false);setTimeout(()=>{notify("✨ GM healed you!","#3dd68c");gLog("GM healed all!","system");},0);}
        if(cmd.type==='teleport'){setRegion(cmd.payload.region);setGameView("world");setTimeout(()=>{notify("🌀 Teleported: "+cmd.payload.region,"#aa88ff");gLog("Teleported to "+cmd.payload.region,"system");},0);}
        if(cmd.type==='trigger_event'){setActiveEvents(p=>p.includes(cmd.payload.ev.id)?p:[...p,cmd.payload.ev.id]);setEventTimers(p=>({...p,[cmd.payload.ev.id]:cmd.payload.ev.duration}));}
        fbSet('global/gmCommands/'+cmdId+'/pb/'+myUid,true);
      });
    };
    r.on('value',handler);return()=>r.off('value',handler);
  },[myUid]);

  // Broadcast world state
  var fbBroadcastWorld=useCallback((update)=>{if(!_fbEnabled)return;fbUpdate('global/world',update);},[]);

  // Send GM command
  var fbSendGmCommand=useCallback((type,payload,target)=>{
    target=target||'all';
    if(_fbEnabled)fbPush('global/gmCommands',{type,payload,target,ts:Date.now()});
    if(type==='give_item'&&(target==='all'||target===myUid)){setMe(p=>p?{...p,inventory:[...p.inventory,payload.item]}:p);notify("📦 GM gave: "+payload.item,"#44aaff");}
    if(type==='set_stat'&&(target==='all'||target===myUid)){setMe(p=>p?{...p,...payload}:p);notify("⚡ Stats updated!","#3dd68c");}
    if(type==='heal_all'){setMe(p=>p?{...p,hp:p.maxHp,mana:p.maxMana}:p);setPoisoned(false);notify("✨ All healed!","#3dd68c");gLog("GM healed all!","system");}
    if(type==='teleport'&&(target==='all'||target===myUid)){setRegion(payload.region);setGameView("world");notify("🌀 Teleported: "+payload.region,"#aa88ff");}
    if(type==='announce'){setAnnouncement(payload);}
    if(type==='whisper'&&(target==='all'||target===myUid)){setWhisper(payload);setTimeout(()=>setWhisper(null),8000);}
    if(type==='trigger_event'){setActiveEvents(p=>p.includes(payload.ev.id)?p:[...p,payload.ev.id]);setEventTimers(p=>({...p,[payload.ev.id]:payload.ev.duration}));notify(payload.ev.icon+" "+payload.ev.name,payload.ev.color);}
    gmLog("CMD["+type+"]: "+JSON.stringify(payload).slice(0,50),"system");
  },[myUid,notify,gLog,gmLog,setMe,setRegion,setGameView,setAnnouncement,setWhisper,setPoisoned]);

  // Cleanup on unmount
  useEffect(()=>{
    if(!myUid||!_fbEnabled)return;
    return()=>{fbSet('global/players/'+myUid+'/online',false);};
  },[myUid]);

  // ── GLOBAL CHAT ──────────────────────────────────────────

  // Listen to last 60 chat messages
  useEffect(()=>{
    if(!_fbEnabled)return;
    var off=fbQuery('global/chat',60,msgs=>{setChatMessages(msgs);});
    return off;
  },[]);

  var chatInitialLoadDone=useRef(false);
  var chatPrevLength=useRef(0);

  // Auto-scroll chat + count unreads
  useEffect(()=>{
    if(!chatInitialLoadDone.current){
      // Skip the first batch (initial historical messages on mount)
      chatInitialLoadDone.current=true;
      chatPrevLength.current=chatMessages.length;
      return;
    }
    var newCount=chatMessages.length-chatPrevLength.current;
    chatPrevLength.current=chatMessages.length;
    if(chatOpen){
      setChatUnread(0);
      setTimeout(()=>{if(chatEndRef.current)chatEndRef.current.scrollIntoView({behavior:"smooth"});},80);
    } else if(newCount>0){
      // Only count messages not sent by us
      var newMsgs=chatMessages.slice(-newCount);
      var othersCount=newMsgs.filter(m=>m.uid!==myUid).length;
      if(othersCount>0)setChatUnread(prev=>prev+othersCount);
    }
  },[chatMessages]);

  var sendChat=useCallback(()=>{
    var msg=(chatInput||"").trim();if(!msg||!myUid||!me)return;
    fbPush('global/chat',{uid:myUid,name:me.name,cls:me.cls,level:me.level,msg,ts:Date.now(),isGM:myUid===GM_UID});
    setChatInput("");
  },[chatInput,myUid,me]);

  // ─────────────────────────────────────────────────────────

  var gmTriggerEvent=(ev)=>{if(activeEvents.includes(ev.id))return;setActiveEvents(p=>[...p,ev.id]);setEventTimers(p=>({...p,[ev.id]:ev.duration}));gLog("GM: "+ev.name+" - "+ev.desc,"system");notify(ev.icon+" "+ev.name,ev.color);if(ev.id==="festival")setXpMult(3);if(ev.id==="goldrush")setGoldMult(5);if(ev.id==="war")setPvpEnabled(true);if(ev.xpMult&&ev.xpMult>1)setXpMult(ev.xpMult);if(ev.goldMult&&ev.goldMult>1)setGoldMult(ev.goldMult);};
  var gmStopEvent=(id)=>{
    // Compute remaining BEFORE updating state, then apply side-effects outside the updater
    setActiveEvents(p=>p.filter(e=>e!==id));
    setEventTimers(p=>{var n={...p};delete n[id];return n;});
    // Reset multipliers if no remaining events need them
    setActiveEvents(remaining=>{
      var hasOtherFestival=remaining.some(eid=>eid==="festival"||_optionalChain([WORLD_EVENTS, 'access', _12 => _12.find, 'call', _13 => _13(e=>e.id===eid), 'optionalAccess', _14 => _14.xpMult])>1);
      var hasOtherGoldrush=remaining.some(eid=>eid==="goldrush"||_optionalChain([WORLD_EVENTS, 'access', _15 => _15.find, 'call', _16 => _16(e=>e.id===eid), 'optionalAccess', _17 => _17.goldMult])>1);
      if(!hasOtherFestival)setXpMult(1);
      if(!hasOtherGoldrush)setGoldMult(1);
      return remaining; // No actual change; just reading to apply side-effects
    });
    if(id==="war")setPvpEnabled(false);
  };
  var gmApplyStats=()=>{if(!me)return;var u={};if(gmStatEdit.atk!=="")u.atk=parseInt(gmStatEdit.atk)||me.atk;if(gmStatEdit.mag!=="")u.mag=parseInt(gmStatEdit.mag)||me.mag;if(gmStatEdit.hp!==""){var vHp=parseInt(gmStatEdit.hp)||me.maxHp;u.maxHp=vHp;u.hp=vHp;}if(gmStatEdit.mana!==""){var vMana=parseInt(gmStatEdit.mana)||me.maxMana;u.maxMana=vMana;u.mana=vMana;}if(gmStatEdit.level!==""){var vLv=Math.max(1,parseInt(gmStatEdit.level)||me.level);u.level=vLv;u.xpNext=xpForLevel(vLv);u.xp=0;}if(gmStatEdit.gold!=="")u.gold=Math.max(0,parseInt(gmStatEdit.gold)||me.gold);if(Object.keys(u).length===0){notify("No stats to apply!","#ff5533");return;}fbSendGmCommand('set_stat',u,'all');gmLog("Stats applied to all: "+JSON.stringify(u).slice(0,60),"system");setGmStatEdit({atk:"",mag:"",hp:"",mana:"",level:"",gold:""});};
  var gmAddShopMod=()=>{var{item,shop,duration}=gmShopForm;var perm=duration==="permanent";var dm={"5min":300000,"15min":900000,"30min":1800000,"1hr":3600000};var mod={id:uid(),item,shop,permanent:perm,expiresAt:perm?null:Date.now()+(dm[duration]||300000)};setGmShopMods(prev=>[...prev.filter(m=>!(m.item===item&&m.shop===shop)),mod]);notify("Shop updated!","#ffd700");};
  var gmSendWhisper=()=>{if(!gmWhisperForm.text)return;var payload={msg:gmWhisperForm.text,color:gmWhisperForm.color};fbSendGmCommand('whisper',payload,'all');setGmWhisperForm(p=>({...p,text:""}));gmLog("Whisper sent to all: "+gmWhisperForm.text,"system");};
  var gmSendAnnounce=()=>{if(!gmAnnounceForm.text)return;var payload={text:gmAnnounceForm.text,color:gmAnnounceForm.color,icon:gmAnnounceForm.icon};fbSendGmCommand('announce',payload,'all');gmLog("ANNOUNCE: "+gmAnnounceForm.icon+" "+gmAnnounceForm.text,"system");setGmAnnounceForm(p=>({...p,text:""}));gmLog("Announcement sent","system");};
  var gmCreateBounty=()=>{if(!gmBountyForm.name)return;var b={id:uid(),...gmBountyForm,progress:0,done:false};setGmBounties(prev=>[...prev,b]);gLog("Bounty posted: "+b.name,"system");notify("Bounty: "+b.name,"#ffd700");setGmBountyForm({name:"",desc:"",goal:1,type:"kills",rewardType:"gold",rewardGold:500,rewardItem:"Health Potion"});};
  var claimBounty=(b)=>{if(!b.done)return;if(b.rewardType==="gold")gainGold(b.rewardGold);else if(b.rewardType==="item"){setMe(p=>p?{...p,inventory:[...p.inventory,b.rewardItem]}:p);gLog("Bounty reward: "+b.rewardItem,"gold");}else if(b.rewardType==="sp"){setSkillPoints(sp=>sp+1);gLog("Bounty reward: +1 SP","system");}setGmBounties(prev=>prev.filter(x=>x.id!==b.id));notify("Bounty claimed!","#ffd700");};
  var gmCreateCustomItem=()=>{if(!gmCustomItemForm.name)return;setGmCustomItems(prev=>({...prev,[gmCustomItemForm.name]:{...gmCustomItemForm,custom:true}}));SHOP_PRICES[gmCustomItemForm.name]={buy:200,sell:80};notify("Created: "+gmCustomItemForm.name,"#44aaff");setGmCustomItemForm({name:"",icon:"⚔️",type:"weapon",effect:"atk",value:20,desc:""});};
  var gmCreateCustomEvent=()=>{if(!gmCustomEventForm.name)return;var ev={id:"custom_"+uid(),name:gmCustomEventForm.name,icon:gmCustomEventForm.icon,color:gmCustomEventForm.color,boss:null,duration:gmCustomEventForm.duration,desc:gmCustomEventForm.desc,xpMult:gmCustomEventForm.xpMult,goldMult:gmCustomEventForm.goldMult};gmTriggerEvent(ev);setGmCustomEventForm({name:"",icon:"🌟",color:"#44ffcc",desc:"",duration:60,xpMult:1,goldMult:1});};

  
  var regData=REGIONS[region]||REGIONS["Starter Isle"];
  var wIcon={clear:"☀️",rain:"🌧️",storm:"⛈️",snow:"❄️",fog:"🌫️",blood:"🌑"}[weather]||"☀️";
  var tIcon=timeOfDay<6?"🌑":timeOfDay<12?"🌅":timeOfDay<18?"☀️":timeOfDay<21?"🌆":"🌙";
  var clsData=me?CLASSES[me.cls]:null;
  var dodgePct=me?Math.round(Math.min(50,(me.spd+hasteBonus)/5+wfx.dodgeBonus*100)):0;
  var healItems=me?me.inventory.filter(i=>_optionalChain([ITEMS, 'access', _18 => _18[i], 'optionalAccess', _19 => _19.type])==="consumable"):[];
  var offItems=me?me.inventory.filter(i=>_optionalChain([ITEMS, 'access', _20 => _20[i], 'optionalAccess', _21 => _21.type])==="offensive"):[];
  var hasAnyItems=healItems.length>0||offItems.length>0;
  var eqWeapon=me?(me.equipped||[]).find(e=>_optionalChain([ITEMS, 'access', _22 => _22[e], 'optionalAccess', _23 => _23.type])==="weapon"):null;
  var eqArmor=me?(me.equipped||[]).find(e=>_optionalChain([ITEMS, 'access', _24 => _24[e], 'optionalAccess', _25 => _25.type])==="armor"):null;
  var escortNPC=_optionalChain([gmPuppet, 'optionalAccess', _26 => _26.mode])==="escort"?npcPlayers.find(n=>n.id===gmPuppet.npcId):null;

  if(screen==="create"){
  var slots=[saveSlots[0],saveSlots[1],saveSlots[2]];return(
    React.createElement('div', { style: {minHeight:"100vh",background:"#050402",color:"#d4b896",fontFamily:"Georgia,serif",overflowY:"auto",WebkitOverflowScrolling:"touch"},}
      , React.createElement('style', null, `@keyframes flicker{0%,100%{opacity:1}50%{opacity:.85}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}button:hover{opacity:0.75!important;transition:opacity 0.15s;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#2a1e0a;}*{box-sizing:border-box;}.cls-card:hover{border-color:#e8aa4488!important;background:#1a1208!important;}@media(max-width:600px){.cls-grid{grid-template-columns:1fr 1fr 1fr!important;}.slot-grid{grid-template-columns:1fr 1fr 1fr!important;}.create-wrap{padding:14px!important;}}`)
      , React.createElement('div', { className:"create-wrap", style: {maxWidth:680,margin:"0 auto",padding:"22px 16px"},}
        , React.createElement('div', { style: {textAlign:"center",marginBottom:24},}
          , React.createElement('div', { style: {fontSize:44,animation:"float 3s infinite",marginBottom:8},}, "\u2694\ufe0f")
          , React.createElement('div', { style: {fontSize:22,color:"#e8aa44",letterSpacing:4,textTransform:"uppercase",animation:"flicker 3s infinite"},}, "Realm of Etherion")
          , React.createElement('div', { style: {fontSize:9,color:"#5a4030",letterSpacing:3,marginTop:4},}, "v8 \u00b7 DUNGEONS \u00b7 MULTI-SAVE \u00b7 MYTHIC GEAR \u00b7 GM PANEL")
        )
        , React.createElement('div', { style: {marginBottom:18},}
          , React.createElement('div', { style: {fontSize:9,color:"#5a4030",letterSpacing:2,marginBottom:8},}, "SAVE SLOTS")
          , React.createElement('div', { className:"slot-grid", style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8},}
            , [1,2,3].map(function(sl){
              var meta=slots[sl-1];
              var isSel=selectedSlot===sl;
              return React.createElement('div', { key:sl, style: {background:isSel?"#1a1208":"#0d0b06",border:"2px solid "+(isSel?"#e8aa44":"#2a1e0a"),borderRadius:6,padding:"10px 8px",cursor:"pointer",textAlign:"center",transition:"all 0.2s"},
                onClick:function(){setSelectedSlot(sl);}},
                React.createElement('div', { style: {fontSize:9,color:"#5a4030",marginBottom:4,letterSpacing:2}}, "SLOT "+sl),
                meta?(
                  React.createElement('div', null,
                    React.createElement('div', { style: {fontSize:16,marginBottom:2}}, CLASSES[meta.cls]?CLASSES[meta.cls].icon:"\u2694\ufe0f"),
                    React.createElement('div', { style: {fontSize:11,color:isSel?"#e8aa44":"#d4b896",fontWeight:"bold"}}, meta.name),
                    React.createElement('div', { style: {fontSize:9,color:"#7a6050"}}, meta.cls+" Lv."+meta.level),
                    React.createElement('div', { style: {fontSize:9,color:"#5a4030"}}, "\u2694\ufe0f "+meta.kills+" kills"),
                    React.createElement('div', { style: {display:"flex",gap:4,marginTop:8,justifyContent:"center",flexWrap:"wrap"}},
                      React.createElement('button', { onClick:function(e){e.stopPropagation();loadGame(sl);}, style: {background:"rgba(61,214,140,0.12)",border:"1px solid #3dd68c",color:"#3dd68c",padding:"5px 10px",borderRadius:3,fontSize:10,cursor:"pointer",fontFamily:"monospace"}}, "\u25b6 LOAD"),
                      confirmDeleteSlot===sl?(
                        React.createElement(React.Fragment, null,
                          React.createElement('button', { onClick:function(e){e.stopPropagation();deleteSlot(sl);setSaveSlots([readSlotMeta(1),readSlotMeta(2),readSlotMeta(3)]);setConfirmDeleteSlot(null);}, style: {background:"rgba(255,50,30,0.15)",border:"1px solid #ff3322",color:"#ff3322",padding:"5px 8px",borderRadius:3,fontSize:10,cursor:"pointer"}}, "DEL"),
                          React.createElement('button', { onClick:function(e){e.stopPropagation();setConfirmDeleteSlot(null);}, style: {background:"none",border:"1px solid #3a2a1a",color:"#5a4030",padding:"5px 8px",borderRadius:3,fontSize:10,cursor:"pointer"}}, "\u2715")
                        )
                      ):(
                        React.createElement('button', { onClick:function(e){e.stopPropagation();setConfirmDeleteSlot(sl);}, style: {background:"rgba(255,85,51,0.08)",border:"1px solid #5a2a1a",color:"#7a4030",padding:"5px 8px",borderRadius:3,fontSize:10,cursor:"pointer"}}, "\U0001f5d1")
                      )
                    )
                  )
                ):(
                  React.createElement('div', null,
                    React.createElement('div', { style: {fontSize:20,margin:"4px 0"}}, "\u2795"),
                    React.createElement('div', { style: {fontSize:9,color:"#3a2a1a"}}, "Empty"),
                    isSel&&React.createElement('div', { style: {fontSize:9,color:"#e8aa44",marginTop:3}}, "\u2713 Selected")
                  )
                )
              );
            })
          )
        )
        , React.createElement('div', { style: {background:"#0f0b07",border:"1px solid #2a1e0a",borderRadius:8,padding:"18px 14px"},}
          , React.createElement('div', { style: {fontSize:11,color:"#e8aa44",letterSpacing:2,marginBottom:14}}, "\u2605 NEW GAME \u2014 SAVE TO SLOT "+selectedSlot)
          , React.createElement('div', { style: {marginBottom:14},}
            , React.createElement('div', { style: {fontSize:9,color:"#5a4030",letterSpacing:2,marginBottom:6},}, "HERO NAME ", React.createElement('span', { style: {color:"#3a2a1a",fontSize:9}}, "(\"Cei\" = GM panel)"))
            , React.createElement('input', { value: playerName, onChange: function(e){setPlayerName(e.target.value);}, maxLength: 20, placeholder:"Enter your hero's name...", style: {...sinp(),width:"100%",padding:"10px 14px",fontSize:14},})
          )
          , React.createElement('div', { style: {marginBottom:14},}
            , React.createElement('div', { style: {fontSize:9,color:"#5a4030",letterSpacing:2,marginBottom:10}}, "CHOOSE CLASS")
            , React.createElement('div', { className:"cls-grid", style: {display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8},}
              , Object.entries(CLASSES).map(function([name,data]){return(
                React.createElement('div', { className:"cls-card", key: name, onClick: function(){setPlayerClass(name);}, style: {background:playerClass===name?"#1e1608":"#0a0804",border:"2px solid "+(playerClass===name?"#e8aa44":"#2a1e0a"),borderRadius:6,padding:"12px 6px",cursor:"pointer",textAlign:"center",transition:"all 0.2s"},}
                  , React.createElement('div', { style: {fontSize:20,marginBottom:3},}, data.icon)
                  , React.createElement('div', { style: {fontSize:11,color:playerClass===name?"#e8aa44":"#d4b896",fontWeight:"bold"}}, name)
                  , React.createElement('div', { style: {fontSize:8,color:"#5a4030",marginTop:2}}, "HP "+data.hp)
                  , React.createElement('div', { style: {fontSize:8,color:"#7a5040",marginTop:1}}, (data.atk>0?"ATK "+data.atk:"MAG "+data.mag)+" SPD "+data.spd)
                )
              );})
            )
          )
          , playerClass&&(
            React.createElement('div', { style: {background:"#0a0804",border:"1px solid #2a1e0a",borderRadius:4,padding:12,marginBottom:14},}
              , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10,marginBottom:6}},
                React.createElement('span', {style:{fontSize:20}}, CLASSES[playerClass].icon),
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:12,color:"#e8aa44",fontWeight:"bold"}}, playerClass),
                  React.createElement('div', {style:{fontSize:10,color:"#7a6050"}}, CLASSES[playerClass].ability+" \u2014 "+CLASSES[playerClass].abilityDesc)
                )
              )
              , React.createElement('div', { style: {display:"flex",gap:10,fontSize:10,color:"#5a4030",flexWrap:"wrap",marginBottom:6}}
                , React.createElement('span', null, "\u2764\ufe0f "+CLASSES[playerClass].hp+" HP")
                , React.createElement('span', null, "\U0001f4a7 "+CLASSES[playerClass].mana+" MP")
                , React.createElement('span', null, CLASSES[playerClass].atk>0?"\u2694\ufe0f "+CLASSES[playerClass].atk+" ATK":"\U0001f52e "+CLASSES[playerClass].mag+" MAG")
                , React.createElement('span', null, "\U0001f4a8 "+CLASSES[playerClass].spd+" SPD")
              )
              , React.createElement('div', { style: {fontSize:10,color:"#4a3828",borderTop:"1px solid #1a1208",paddingTop:6}}, React.createElement('span', {style:{color:"#aa88ff"}}, "Quest: "), _optionalChain([CLASS_QUESTS,'access',_27=>_27[playerClass],'optionalAccess',_28=>_28.desc]))
            )
          )
          , React.createElement('button', { onClick: function(){startGame(selectedSlot);}, style: {width:"100%",background:"rgba(232,170,68,0.12)",border:"2px solid #e8aa44",color:"#e8aa44",borderRadius:6,padding:"14px",fontSize:14,cursor:"pointer",letterSpacing:2,fontFamily:"Georgia,serif",touchAction:"manipulation"},}, "\u2694 BEGIN LEGEND \u2014 SLOT "+selectedSlot)
        )
      )
    )
  );
}

  // ─── LOBBY SCREEN ────────────────────────────────────────
  // ── AUTH LOADING ──────────────────────────────────────────
  if(authLoading) return React.createElement('div',{style:{minHeight:"100vh",background:"#050402",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,color:"#e8aa44",fontFamily:"Georgia,serif",fontSize:14,letterSpacing:3}},
    React.createElement('div',{style:{width:36,height:36,border:"3px solid #2a1e0a",borderTopColor:"#e8aa44",borderRadius:"50%",animation:"spin 1s linear infinite"}}),
    "LOADING..."
  );

  // ── AUTH SCREEN (Login / Register) ────────────────────────
  if(screen==="auth") return(
    React.createElement('div',{style:{minHeight:"100vh",background:"#050402",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"Georgia,serif"}},
      React.createElement('style',null,`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes fadeIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}button:hover{opacity:0.8!important;}`),
      React.createElement('div',{style:{width:"100%",maxWidth:400,animation:"fadeIn 0.4s ease"}},
        // Logo
        React.createElement('div',{style:{textAlign:"center",marginBottom:28}},
          React.createElement('div',{style:{fontSize:44,animation:"float 3s infinite",marginBottom:10}}, "⚔️"),
          React.createElement('div',{style:{fontSize:22,color:"#e8aa44",letterSpacing:4,marginBottom:4}}, "REALM OF ETHERION"),
          React.createElement('div',{style:{fontSize:9,color:"#5a4030",letterSpacing:3}}, "ONE WORLD · ALL PLAYERS · FOREVER")
        ),
        // Tab switcher
        React.createElement('div',{style:{display:"flex",marginBottom:20,borderBottom:"1px solid #2a1e0a"}},
          ["login","register"].map(t=>
            React.createElement('button',{key:t,onClick:()=>{setAuthScreen(t);setAuthError("");},
              style:{flex:1,background:"none",border:"none",borderBottom:authScreen===t?"2px solid #e8aa44":"2px solid transparent",color:authScreen===t?"#e8aa44":"#5a4030",padding:"10px",fontSize:12,cursor:"pointer",letterSpacing:2,fontFamily:"Georgia,serif",marginBottom:-1}},
              t==="login"?"SIGN IN":"CREATE ACCOUNT"
            )
          )
        ),
        // Form
        React.createElement('div',{style:{display:"flex",flexDirection:"column",gap:10}},
          authScreen==="register"&&React.createElement('div',null,
            React.createElement('div',{style:{fontSize:9,color:"#5a4030",letterSpacing:2,marginBottom:5}}, "USERNAME"),
            React.createElement('input',{value:authUsername,onChange:e=>setAuthUsername(e.target.value),placeholder:"Choose a username...",
              style:{width:"100%",background:"#0a0804",border:"1px solid #2a1e0a",color:"#d4b896",borderRadius:4,padding:"12px 14px",fontSize:13,fontFamily:"Georgia,serif",outline:"none",boxSizing:"border-box"}})
          ),
          React.createElement('div',null,
            React.createElement('div',{style:{fontSize:9,color:"#5a4030",letterSpacing:2,marginBottom:5}}, "EMAIL"),
            React.createElement('input',{type:"email",value:authEmail,onChange:e=>setAuthEmail(e.target.value),placeholder:"your@email.com",
              onKeyDown:e=>{if(e.key==="Enter"&&authScreen==="login")doLogin();},
              style:{width:"100%",background:"#0a0804",border:"1px solid #2a1e0a",color:"#d4b896",borderRadius:4,padding:"12px 14px",fontSize:13,fontFamily:"Georgia,serif",outline:"none",boxSizing:"border-box"}})
          ),
          React.createElement('div',null,
            React.createElement('div',{style:{fontSize:9,color:"#5a4030",letterSpacing:2,marginBottom:5}}, "PASSWORD"),
            React.createElement('input',{type:"password",value:authPassword,onChange:e=>setAuthPassword(e.target.value),placeholder:"6+ characters",
              onKeyDown:e=>{if(e.key==="Enter"){authScreen==="login"?doLogin():doRegister();}},
              style:{width:"100%",background:"#0a0804",border:"1px solid #2a1e0a",color:"#d4b896",borderRadius:4,padding:"12px 14px",fontSize:13,fontFamily:"Georgia,serif",outline:"none",boxSizing:"border-box"}})
          ),
          authError&&React.createElement('div',{style:{fontSize:11,color:"#ff5533",padding:"8px 12px",background:"rgba(255,50,30,0.06)",border:"1px solid #ff553344",borderRadius:4,lineHeight:1.4}}, authError),
          React.createElement('button',{
            onClick:authScreen==="login"?doLogin:doRegister,
            style:{width:"100%",background:"rgba(232,170,68,0.12)",border:"2px solid #e8aa44",color:"#e8aa44",borderRadius:6,padding:"14px",fontSize:14,cursor:"pointer",letterSpacing:2,fontFamily:"Georgia,serif",marginTop:6}
          }, authScreen==="login"?"⚔ ENTER THE REALM":"✦ CREATE ACCOUNT"),
          React.createElement('div',{style:{textAlign:"center",fontSize:10,color:"#3a2a1a",marginTop:8}},
            authScreen==="login"?"No account? ":"Have an account? ",
            React.createElement('span',{onClick:()=>{setAuthScreen(authScreen==="login"?"register":"login");setAuthError("");},
              style:{color:"#7a6050",cursor:"pointer",textDecoration:"underline"}},
              authScreen==="login"?"Create one":"Sign in")
          )
        )
      )
    )
  );
  // ─────────────────────────────────────────────────────────

  return(
    React.createElement('div', { style: {minHeight:"100vh",background:regData.bg,color:"#d4b896",fontFamily:"Georgia,serif",fontSize:13},}
      , React.createElement('style', null, `
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes slideIn{from{transform:translateX(16px);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 8px ${regData.accent}44}50%{box-shadow:0 0 22px ${regData.accent}99}}
        @keyframes deathIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
        @keyframes lvlUp{0%{transform:scale(0.7);opacity:0}60%{transform:scale(1.07)}100%{transform:scale(1);opacity:1}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes achSlide{0%{transform:translateX(110%)}10%{transform:translateX(-3%)}18%{transform:translateX(0)}85%{transform:translateX(0)}100%{transform:translateX(110%)}}
        button:hover{opacity:0.75!important;}
        ::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-thumb{background:#2a1e0a;}
        .gm-side::-webkit-scrollbar-thumb{background:#1a2535;}
        @media(max-width:900px){.split{flex-direction:column!important;}.gm-side{max-height:50vh;overflow-y:auto;}}@media(max-width:700px){.player-side{width:100vw!important;}.nav-btn{padding:5px 4px!important;}.inv-grid{grid-template-columns:1fr 1fr!important;}.shop-grid{grid-template-columns:1fr 1fr!important;}.map-grid{grid-template-columns:1fr 1fr!important;}}*{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}button{touch-action:manipulation;}
      `)

      , notification&&React.createElement('div', { style: {position:"fixed",top:14,right:14,background:"rgba(0,0,0,0.95)",border:"1px solid "+notification.color,color:notification.color,padding:"11px 18px",borderRadius:6,fontSize:13,zIndex:9999,animation:"slideIn 0.2s ease",letterSpacing:1,maxWidth:"calc(100vw - 28px)"},}, notification.msg)
      , newAchievement&&React.createElement('div', { style: {position:"fixed",top:60,right:0,background:"rgba(0,0,0,0.96)",border:"1px solid #e8aa44",borderRight:"none",color:"#e8aa44",padding:"10px 18px",borderRadius:"6px 0 0 6px",zIndex:9998,animation:"achSlide 4.5s ease forwards",pointerEvents:"none"},}, React.createElement('div', { style: {fontSize:9,letterSpacing:2,color:"#5a4030",marginBottom:2},}, "ACHIEVEMENT"), React.createElement('div', { style: {fontSize:14},}, _optionalChain([ACHIEVEMENTS_DEF, 'access', _31 => _31.find, 'call', _32 => _32(a=>a.id===newAchievement.id), 'optionalAccess', _33 => _33.icon])||"🏅", " " , newAchievement.name))
      , announcement&&React.createElement('div', { style: {position:"fixed",top:0,left:0,right:0,background:"rgba(0,0,0,0.97)",borderBottom:"3px solid "+announcement.color,padding:"14px 20px",zIndex:9997,display:"flex",alignItems:"center",gap:12},}, React.createElement('span', { style: {fontSize:26},}, announcement.icon), React.createElement('div', { style: {flex:1,fontSize:14,color:announcement.color,letterSpacing:1},}, announcement.text), React.createElement('button', { onClick: ()=>setAnnouncement(null), style: {background:"none",border:"1px solid "+announcement.color,color:announcement.color,padding:"3px 10px",borderRadius:3,cursor:"pointer",fontSize:12},}, "✕"))
      , whisper&&React.createElement('div', { style: {position:"fixed",bottom:80,left:14,background:"rgba(0,0,0,0.97)",border:"1px solid "+whisper.color,color:whisper.color,padding:"12px 16px",borderRadius:6,zIndex:9996,maxWidth:300,animation:"slideUp 0.3s ease"},}, React.createElement('div', { style: {fontSize:9,letterSpacing:2,marginBottom:5,color:"#5a4030"},}, "📨 WHISPER FROM GM"   ), React.createElement('div', { style: {fontSize:13,lineHeight:1.5},}, whisper.msg), React.createElement('button', { onClick: ()=>setWhisper(null), style: {marginTop:8,background:"none",border:"1px solid "+whisper.color+"44",color:whisper.color,padding:"2px 8px",borderRadius:2,cursor:"pointer",fontSize:10,width:"100%"},}, "Close"))

      /* ── GLOBAL CHAT BUTTON ─────────────────────────────── */
      , React.createElement('div', {style:{position:"fixed",bottom:16,left:16,zIndex:8100,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:8}},
        /* Chat toggle */
        React.createElement(Btn, {
          onClick:()=>{setChatOpen(v=>!v);if(!chatOpen)setChatUnread(0);},
          style:{background:chatOpen?"#0d1117":"rgba(68,170,255,0.08)",border:"2px solid "+(chatOpen?"#44aaff":"#44aaff44"),color:chatOpen?"#44aaff":"#44aaff88",borderRadius:8,padding:"9px 14px",fontSize:13,fontFamily:"monospace",display:"flex",alignItems:"center",gap:8,position:"relative"}
        },
          "💬",
          React.createElement('span',{style:{fontSize:10,letterSpacing:1}}, chatOpen?"CLOSE":"CHAT"),
          chatUnread>0&&!chatOpen&&React.createElement('div',{style:{position:"absolute",top:-6,right:-6,background:"#ff4444",color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace"}}, chatUnread>9?"9+":chatUnread)
        ),
        /* Logout button */
        React.createElement(Btn, {
          onClick:doLogout,
          style:{background:"rgba(255,50,30,0.06)",border:"1px solid #ff333344",color:"#ff5533",borderRadius:6,padding:"6px 12px",fontSize:10,fontFamily:"monospace",letterSpacing:1}
        }, "⏻ LOGOUT")
      )

      /* ── GLOBAL CHAT PANEL ──────────────────────────────── */
      , chatOpen&&React.createElement('div', {style:{position:"fixed",bottom:0,left:0,right:0,height:"min(50vh,380px)",background:"#07090d",borderTop:"2px solid #1a2535",zIndex:8050,display:"flex",flexDirection:"column"}},
        /* Header */
        React.createElement('div',{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px",borderBottom:"1px solid #1a2535",background:"#0d1117",flexShrink:0}},
          React.createElement('div',{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement('div',{style:{fontSize:12,color:"#44aaff",letterSpacing:2,fontFamily:"monospace",fontWeight:"bold"}}, "💬 GLOBAL CHAT"),
            React.createElement('div',{style:{fontSize:10,color:"#3a5068"}}, Object.keys(onlinePlayers).filter(k=>onlinePlayers[k].online).length+" online")
          ),
          React.createElement(Btn,{onClick:()=>setChatOpen(false),style:{background:"none",border:"1px solid #1a2535",color:"#3a5068",padding:"3px 10px",borderRadius:4,fontSize:14}}, "✕")
        ),
        /* Messages */
        React.createElement('div',{style:{flex:1,overflowY:"auto",padding:"8px 12px",display:"flex",flexDirection:"column",gap:4}},
          chatMessages.length===0&&React.createElement('div',{style:{color:"#3a5068",fontSize:11,textAlign:"center",marginTop:20}}, "No messages yet. Say hello! 👋"),
          chatMessages.map((m,i)=>{
            var isMe=m.uid===myUid;
            var nameColor=m.isGM?"#ffd700":m.cls==="Mage"?"#aa88ff":m.cls==="Rogue"?"#55cc66":m.cls==="Necromancer"?"#cc44ff":m.cls==="Ranger"?"#44ffaa":"#b8cfe0";
            return React.createElement('div',{key:i,style:{display:"flex",gap:8,alignItems:"flex-start",flexDirection:isMe?"row-reverse":"row"}},
              React.createElement('div',{style:{fontSize:14,flexShrink:0}}, (CLASSES[m.cls]||{}).icon||"⚔️"),
              React.createElement('div',{style:{maxWidth:"75%",background:isMe?"rgba(68,170,255,0.1)":"rgba(0,0,0,0.3)",border:"1px solid "+(isMe?"#44aaff33":"#1a2535"),borderRadius:isMe?"8px 8px 2px 8px":"8px 8px 8px 2px",padding:"6px 10px"}},
                React.createElement('div',{style:{fontSize:10,color:nameColor,fontWeight:"bold",marginBottom:2}},
                  m.name+(m.isGM?" 👑":"")+" · Lv."+m.level),
                React.createElement('div',{style:{fontSize:12,color:"#d4b896",lineHeight:1.4,wordBreak:"break-word"}}, m.msg)
              )
            );
          }),
          React.createElement('div',{ref:chatEndRef})
        ),
        /* Input */
        React.createElement('div',{style:{display:"flex",gap:8,padding:"8px 12px",borderTop:"1px solid #1a2535",background:"#0d1117",flexShrink:0}},
          React.createElement('input',{
            value:chatInput,
            placeholder:"Type a message…",
            onChange:e=>setChatInput(e.target.value),
            onKeyDown:e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat();}},
            maxLength:200,
            style:{flex:1,background:"#0a0c10",border:"1px solid #1a2535",color:"#d4b896",borderRadius:6,padding:"10px 14px",fontSize:13,fontFamily:"Georgia,serif",outline:"none"}
          }),
          React.createElement(Btn,{onClick:sendChat,style:{background:"rgba(68,170,255,0.12)",border:"1px solid #44aaff",color:"#44aaff",borderRadius:6,padding:"10px 16px",fontSize:13,fontFamily:"monospace"}}, "Send")
        )
      )

      
      , tutorialStep>=0&&tutorialStep<TUTORIAL_STEPS.length&&!tutorialDone&&React.createElement('div', { style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:20000,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"0 0 16px 0"},}
          , React.createElement('div', { style:{maxWidth:540,width:"calc(100% - 28px)",background:"#0f0c08",border:"2px solid #e8aa44",borderRadius:10,padding:"20px 20px",animation:"slideUp 0.3s ease",touchAction:"manipulation"},}
            , React.createElement('div', { style:{display:"flex",alignItems:"center",gap:12,marginBottom:12}},
                React.createElement('div', { style:{fontSize:32}}, TUTORIAL_STEPS[tutorialStep].icon),
                React.createElement('div', null,
                  React.createElement('div', { style:{fontSize:9,color:"#5a4030",letterSpacing:2,marginBottom:2}}, "TUTORIAL "+(tutorialStep+1)+"/"+TUTORIAL_STEPS.length),
                  React.createElement('div', { style:{fontSize:15,color:"#e8aa44",fontWeight:"bold"}}, TUTORIAL_STEPS[tutorialStep].title)
                )
              )
            , React.createElement('div', { style:{fontSize:12,color:"#d4b896",lineHeight:1.7,marginBottom:8}}, TUTORIAL_STEPS[tutorialStep].desc)
            , React.createElement('div', { style:{fontSize:10,color:"#6a5040",fontStyle:"italic",marginBottom:14,padding:"7px 10px",background:"rgba(232,170,68,0.04)",border:"1px solid #2a1e0a",borderRadius:4}}, "\U0001f4a1 "+TUTORIAL_STEPS[tutorialStep].hint)
            , React.createElement('div', { style:{display:"flex",gap:8}},
                React.createElement('button', { onClick:function(){setTutorialStep(-1);setTutorialDone(true);}, style:{flex:1,background:"rgba(255,255,255,0.03)",border:"1px solid #2a1e0a",color:"#5a4030",borderRadius:4,padding:"9px 0",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif",touchAction:"manipulation"}}, "Skip"),
                tutorialStep>0&&React.createElement('button', { onClick:function(){setTutorialStep(function(s){return s-1;});}, style:{background:"rgba(232,170,68,0.06)",border:"1px solid #4a3010",color:"#9a7040",borderRadius:4,padding:"9px 14px",fontSize:10,cursor:"pointer",fontFamily:"Georgia,serif",touchAction:"manipulation"}}, "\u2190"),
                React.createElement('button', { onClick:function(){if(tutorialStep<TUTORIAL_STEPS.length-1){setTutorialStep(function(s){return s+1;});}else{setTutorialStep(-1);setTutorialDone(true);}}, style:{flex:2,background:"rgba(232,170,68,0.14)",border:"1px solid #e8aa44",color:"#e8aa44",borderRadius:4,padding:"10px 0",fontSize:12,cursor:"pointer",fontFamily:"Georgia,serif",letterSpacing:1,touchAction:"manipulation"}}, tutorialStep<TUTORIAL_STEPS.length-1?"Next \u2192":"\u2713 Got It!")
              )
          )
        )
, deathScreen&&React.createElement('div', { style: {position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.97)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",animation:"deathIn 0.5s ease"},}, React.createElement('div', { style: {textAlign:"center",maxWidth:380},}, React.createElement('div', { style: {fontSize:80,animation:"floatY 2s infinite",marginBottom:16},}, "💀"), React.createElement('div', { style: {fontSize:36,color:"#ff3322",letterSpacing:6,fontWeight:"bold",marginBottom:8},}, "YOU DIED" ), React.createElement('div', { style: {fontSize:14,color:"#7a5040",marginBottom:28},}, "Slain by "  , React.createElement('span', { style: {color:"#ff6644"},}, deathScreen.killer), " in "  , deathScreen.region), React.createElement('div', { style: {background:"rgba(255,50,30,0.06)",border:"1px solid #3a1808",borderRadius:8,padding:20,marginBottom:24},}, [["Level",deathScreen.level],["Kills",deathScreen.kills],["Gold lost","-"+deathScreen.goldLost+"g"]].map(([k,v])=>React.createElement('div', { key: k, style: {display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #2a1208",fontSize:13},}, React.createElement('span', { style: {color:"#5a4030"},}, k), React.createElement('span', { style: {color:k==="Gold lost"?"#ff5533":"#d4b896",fontWeight:"bold"},}, v)))), React.createElement('button', { onClick: ()=>setDeathScreen(null), style: {background:"rgba(255,50,30,0.1)",border:"1px solid #ff3322",color:"#ff3322",padding:"12px 40px",borderRadius:4,cursor:"pointer",fontSize:15,fontFamily:"Georgia,serif",letterSpacing:3},}, "⚔ RESPAWN" )))
      , levelUpInfo&&React.createElement('div', { style: {position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.92)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center"},}, React.createElement('div', { style: {textAlign:"center",maxWidth:360,animation:"lvlUp 0.5s ease"},}, React.createElement('div', { style: {fontSize:72,animation:"floatY 1.5s infinite",marginBottom:12},}, "⬆️"), React.createElement('div', { style: {fontSize:11,color:"#e8aa44",letterSpacing:5,marginBottom:4},}, "LEVEL UP!" ), React.createElement('div', { style: {fontSize:44,color:"#e8aa44",fontWeight:"bold",marginBottom:20,textShadow:"0 0 30px #e8aa44"},}, "Level " , levelUpInfo.newLevel), React.createElement('div', { style: {background:"rgba(232,170,68,0.06)",border:"1px solid #2a1e0a",borderRadius:8,padding:20,marginBottom:24},}, [["❤️ Max HP","+"+levelUpInfo.hpGain],["⚔️ ATK","+"+levelUpInfo.atkGain],["✨ MAG","+"+levelUpInfo.magGain],["💧 Mana","+"+levelUpInfo.manaGain],["🌟 SP","+1"]].map(([k,v])=>React.createElement('div', { key: k, style: {display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #1a1208",fontSize:13},}, React.createElement('span', { style: {color:"#7a6050"},}, k), React.createElement('span', { style: {color:"#ffd700",fontWeight:"bold"},}, v)))), React.createElement('button', { onClick: ()=>setLevelUpInfo(null), style: {background:"rgba(232,170,68,0.12)",border:"1px solid #e8aa44",color:"#e8aa44",padding:"12px 40px",borderRadius:4,cursor:"pointer",fontSize:15,fontFamily:"Georgia,serif",letterSpacing:3},}, "CONTINUE")))
      , dungeonComplete&&React.createElement('div', { style: {position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.92)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",animation:"lvlUp 0.4s ease"},}, React.createElement('div', { style: {textAlign:"center",maxWidth:360},}, React.createElement('div', { style: {fontSize:72,animation:"floatY 2s infinite",marginBottom:12},}, "🏆"), React.createElement('div', { style: {fontSize:13,color:"#e8aa44",letterSpacing:4,marginBottom:6},}, "DUNGEON CLEARED!" ), React.createElement('div', { style: {fontSize:26,color:"#e8aa44",fontWeight:"bold",marginBottom:20},}, dungeonComplete.name), React.createElement('div', { style: {background:"rgba(232,170,68,0.06)",border:"1px solid #2a1e0a",borderRadius:8,padding:20,marginBottom:24},}, React.createElement('div', { style: {fontSize:16,color:"#ffd700",fontWeight:"bold"},}, "💰 " , dungeonComplete.reward.toLocaleString(), " gold" )), React.createElement('button', { onClick: ()=>setDungeonComplete(null), style: {background:"rgba(232,170,68,0.12)",border:"1px solid #e8aa44",color:"#e8aa44",padding:"12px 40px",borderRadius:4,cursor:"pointer",fontSize:15,fontFamily:"Georgia,serif",letterSpacing:3},}, "CLAIM")))

      , _optionalChain([randomEvent, 'optionalAccess', _34 => _34.type])==="shrine"&&(
        React.createElement('div', { style: {position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.88)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",animation:"lvlUp 0.4s ease"},}
          , React.createElement('div', { style: {maxWidth:380,width:"100%",padding:20},}
            , React.createElement('div', { style: {textAlign:"center",marginBottom:20},}
              , React.createElement('div', { style: {fontSize:60,marginBottom:10,animation:"floatY 2s infinite"},}, "🕌")
              , React.createElement('div', { style: {fontSize:14,color:"#aa88ff",letterSpacing:3},}, "HIDDEN SHRINE" )
              , React.createElement('div', { style: {fontSize:12,color:"#7a6050",marginTop:6},}, "Choose one blessing from the ancients"     )
            )
            , React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:10},}
              , randomEvent.buffs.map(buff=>(
                React.createElement(Btn, { key: buff.id, onClick: ()=>{
                  if(!me)return;
                  if(buff.id==="hp")setMe(p=>p?{...p,hp:p.maxHp}:p);
                  else if(buff.id==="mana")setMe(p=>p?{...p,mana:p.maxMana}:p);
                  else if(buff.id==="atk")setMe(p=>p?{...p,atk:p.atk+20}:p);
                  else if(buff.id==="gold")setMe(p=>p?{...p,gold:p.gold+300}:p);
                  else if(buff.id==="xp")gainXP(500);
                  gLog("Shrine: "+buff.label,"system");notify(buff.icon+" "+buff.label,"#aa88ff");
                  setRandomEvent(null);
                }, style: {background:"rgba(170,68,255,0.08)",border:"1px solid #aa44ff44",color:"#d4b896",padding:"14px 16px",borderRadius:6,textAlign:"left",fontSize:13},}
                  , React.createElement('span', { style: {fontSize:20,marginRight:10},}, buff.icon)
                  , React.createElement('span', { style: {color:"#aa88ff",fontWeight:"bold"},}, buff.label)
                  , React.createElement('div', { style: {fontSize:11,color:"#7a6050",marginTop:4,marginLeft:30},}, buff.desc)
                )
              ))
            )
            , React.createElement(Btn, { onClick: ()=>setRandomEvent(null), style: {width:"100%",marginTop:12,background:"none",border:"1px solid #2a1e0a",color:"#5a4030",padding:"8px",borderRadius:4,fontSize:11},}, "Leave the shrine"  )
          )
        )
      )
      , _optionalChain([randomEvent, 'optionalAccess', _35 => _35.type])==="wanderer"&&(
        React.createElement('div', { style: {position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.88)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",animation:"lvlUp 0.4s ease"},}
          , React.createElement('div', { style: {maxWidth:400,width:"100%",padding:20},}
            , React.createElement('div', { style: {textAlign:"center",marginBottom:16},}
              , React.createElement('div', { style: {fontSize:52,marginBottom:8},}, "🛒")
              , React.createElement('div', { style: {fontSize:14,color:"#ffd700",letterSpacing:3},}, "WANDERING MERCHANT" )
              , React.createElement('div', { style: {fontSize:11,color:"#7a6050",marginTop:4},}, "30% discount · Limited stock!"    )
            )
            , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12},}
              , randomEvent.items.map(item=>{
                var data=ITEMS[item]||{};var price=Math.round((_optionalChain([SHOP_PRICES, 'access', _36 => _36[item], 'optionalAccess', _37 => _37.buy])||100)*0.7);var canAfford=me&&me.gold>=price;
                return(
                  React.createElement('div', { key: item, style: {background:"rgba(0,0,0,0.4)",border:"1px solid #2a1e0a",borderRadius:4,padding:"10px 12px"},}
                    , React.createElement('div', { style: {fontSize:12,marginBottom:4},}, data.icon, " " , item)
                    , React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginBottom:6},}, data.desc)
                    , React.createElement(Btn, { onClick: ()=>{if(!canAfford)return;setMe(p=>p?{...p,gold:p.gold-price,inventory:[...p.inventory,item]}:p);gLog("Bought "+item+" for "+price+"g","gold");notify("Bought: "+item,"#ffd700");setRandomEvent(prev=>({...prev,items:prev.items.filter(i=>i!==item)}));}, disabled: !canAfford, style: {width:"100%",background:canAfford?"rgba(232,170,68,0.08)":"rgba(0,0,0,0.2)",border:"1px solid "+(canAfford?"#e8aa44":"#2a1e0a"),color:canAfford?"#e8aa44":"#5a4030",padding:"4px",borderRadius:2,fontSize:10},}, price, "g")
                  )
                );
              })
            )
            , React.createElement(Btn, { onClick: ()=>setRandomEvent(null), style: {width:"100%",background:"rgba(90,64,48,0.2)",border:"1px solid #5a4030",color:"#7a6050",padding:"8px",borderRadius:4,fontSize:11},}, "Move on" )
          )
        )
      )

      , React.createElement('div', { className: "split", style: {display:"flex",minHeight:"100vh"},}
        , React.createElement('div', { style: {flex:1,minWidth:0,display:"flex",flexDirection:"column",borderRight:"1px solid #2a1e0a"},}
          , React.createElement('div', { style: {background:"rgba(0,0,0,0.55)",borderBottom:"1px solid #2a1e0a",padding:"10px 16px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},}
            , React.createElement('div', { style: {fontSize:13,color:regData.accent,fontWeight:"bold",flex:1,minWidth:100},}, wIcon, " " , region, " " , tIcon, isNight&&React.createElement('span', { style: {fontSize:10,color:"#7744cc",marginLeft:6},}, "🌙"))
            , React.createElement('div', { style: {display:"flex",gap:4,flexWrap:"wrap"},}
              , [["world","🌍","World"],["inventory","🎒","Bag"],["quests","📋","Quests"],["map","🗺️","Map"],["shop","🛍️","Shop"],["achieve","🏅","Awards"],["board","🏆","Board"]].map(([v,ic,label])=>(
                React.createElement(Btn, { key: v, className:"nav-btn", onClick: ()=>gameView!=="combat"&&setGameView(v), style: {background:gameView===v?"rgba(232,170,68,0.14)":"none",border:"1px solid "+(gameView===v?regData.accent:"#2a1e0a"),color:gameView===v?regData.accent:"#5a4030",padding:"5px 6px",borderRadius:3,fontSize:11,minWidth:38,display:"flex",flexDirection:"column",alignItems:"center",gap:1},}, React.createElement('span',{style:{fontSize:14}},ic), React.createElement('span',{style:{fontSize:8,letterSpacing:1}},label))
              ))
              , dungeon&&React.createElement(Btn, { onClick: ()=>setGameView("dungeon"), className:"nav-btn", style: {background:"rgba(232,170,68,0.18)",border:"1px solid #e8aa44",color:"#e8aa44",padding:"5px 6px",borderRadius:3,fontSize:11,minWidth:38,display:"flex",flexDirection:"column",alignItems:"center",gap:1,animation:"pulse 2s infinite"},}, React.createElement('span',{style:{fontSize:14}},"🏰"), React.createElement('span',{style:{fontSize:8,letterSpacing:1}},"Dungeon"))
            )
            , React.createElement(Btn, { onClick: ()=>{setIsGMMode(v=>!v);setGmOpen(v=>!v);}, style: {background:isGMMode?"rgba(61,214,140,0.15)":"rgba(61,214,140,0.05)",border:"1px solid "+(isGMMode?"#3dd68c":"#3dd68c44"),color:isGMMode?"#3dd68c":"#3dd68c66",padding:"5px 10px",borderRadius:3,fontSize:11,fontFamily:"monospace",letterSpacing:1},}, isGMMode?"◈ GM":"◈")
          )

          , me&&(
            React.createElement('div', { style: {background:"rgba(0,0,0,0.45)",borderBottom:"1px solid #1a1208",padding:"10px 16px"},}
              , React.createElement('div', { style: {display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"},}
                , React.createElement('div', { style: {textAlign:"center",flexShrink:0},}, React.createElement('div', { style: {fontSize:24},}, _optionalChain([clsData, 'optionalAccess', _38 => _38.icon])), party&&React.createElement('div', { style: {fontSize:14,marginTop:-4},}, party.icon))
                , React.createElement('div', { style: {flex:"0 0 auto"},}
                  , React.createElement('div', { style: {fontSize:13,color:regData.accent,fontWeight:"bold"},}, me.name, " " , React.createElement('span', { style: {color:"#5a4030",fontSize:11},}, "Lv.", me.level))
                  , React.createElement('div', { style: {fontSize:10,color:"#5a4030"},}, me.cls, " · "  , me.kills, " kills" , skillPoints>0&&React.createElement('span', { style: {color:"#aa88ff"},}, " · "  , skillPoints, "SP"), killStreak>=5&&React.createElement('span', { style: {marginLeft:6,color:"#ff8800",fontSize:9,border:"1px solid #ff8800",padding:"0 4px",borderRadius:2}}, "🔥 x",killStreak))
                  , party&&React.createElement('div', { style: {fontSize:10,color:"#55cc66",marginTop:2},}, "🤝 " , party.name, " HP:" , party.hp, "/", party.maxHp)
                  , React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginTop:2,letterSpacing:1}}, "🌍 Global Server · "+Object.keys(onlinePlayers).filter(k=>onlinePlayers[k].online).length+" online"+(myUid===GM_UID?" · [GM]": ""))
                  , React.createElement('div', { style: {display:"flex",gap:4,marginTop:3,flexWrap:"wrap"},}
                    , poisoned&&React.createElement('span', { style: {fontSize:9,border:"1px solid #44aa22",color:"#88ff44",padding:"0 4px",borderRadius:2},}, "☠ PSN" )
                    , shielded&&React.createElement('span', { style: {fontSize:9,border:"1px solid #2255cc",color:"#4488ff",padding:"0 4px",borderRadius:2},}, "🛡 BLOCK" )
                    , rageTurns>0&&React.createElement('span', { style: {fontSize:9,border:"1px solid #cc2200",color:"#ff4422",padding:"0 4px",borderRadius:2},}, "🔴 RAGE×" , rageTurns)
                    , hasteBonus>0&&React.createElement('span', { style: {fontSize:9,border:"1px solid #2288aa",color:"#44ccff",padding:"0 4px",borderRadius:2},}, "💨 HASTE" ), bannerTurns>0&&React.createElement('span', { style: {fontSize:9,border:"1px solid #ff8800",color:"#ffaa44",padding:"0 4px",borderRadius:2}}, "🚩 BANNER×",bannerTurns)
                  )
                )
                , React.createElement('div', { style: {flex:1,minWidth:140},}
                  , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",fontSize:10,color:"#5a4030",marginBottom:2},}, React.createElement('span', null, "❤️ " , me.hp, "/", me.maxHp), React.createElement('span', { style: {fontSize:9,color:me.hp<me.maxHp*0.25?"#ff4444":"#5a4030"},}, Math.round((me.hp/me.maxHp)*100), "%"))
                  , React.createElement(Bar, { val: me.hp, max: me.maxHp, color: me.hp<me.maxHp*0.25?"#ff5533":me.hp<me.maxHp*0.5?"#e8aa44":"#55cc66",})
                  , party&&(React.createElement(React.Fragment, null, React.createElement('div', { style: {fontSize:9,color:"#5a6040",marginTop:3,marginBottom:2},}, party.name, ": " , party.hp, "/", party.maxHp), React.createElement(Bar, { val: party.hp, max: party.maxHp, color: "#44cc88", h: 4,})))
                  , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",fontSize:10,color:"#5a4030",marginTop:4,marginBottom:2},}, React.createElement('span', null, "💧 " , me.mana, "/", me.maxMana), React.createElement('span', { style: {fontSize:9,color:"#3a6080"},}, "+5/turn"))
                  , React.createElement(Bar, { val: me.mana, max: me.maxMana, color: "#4488ff", h: 5,})
                  , React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginTop:3,marginBottom:2},}, "⭐ " , me.xp, "/", me.xpNext)
                  , React.createElement(Bar, { val: me.xp, max: me.xpNext, color: "#aa44ff", h: 4,})
                )
                , React.createElement('div', { style: {textAlign:"right",flexShrink:0},}
                  , React.createElement('div', { style: {fontSize:13,color:"#ffd700",fontWeight:"bold"},}, "💰 " , me.gold.toLocaleString(), "g")
                  , eqWeapon&&React.createElement('div', { style: {fontSize:9,color:regData.accent,marginTop:3},}, _optionalChain([ITEMS, 'access', _39 => _39[eqWeapon], 'optionalAccess', _40 => _40.icon]), " " , eqWeapon)
                  , eqArmor&&React.createElement('div', { style: {fontSize:9,color:"#4488aa"},}, _optionalChain([ITEMS, 'access', _41 => _41[eqArmor], 'optionalAccess', _42 => _42.icon]), " " , eqArmor)
                  , React.createElement('div', { style: {fontSize:9,color:"#3a5030",marginTop:2},}, "Dodge " , dodgePct, "%")
                )
              )
              , (activeEvents.length>0||gmBounties.some(b=>!b.done))&&(
                React.createElement('div', { style: {marginTop:8,display:"flex",gap:6,flexWrap:"wrap"},}
                  , activeEvents.map(evId=>{var ev=WORLD_EVENTS.find(e=>e.id===evId)||{id:evId,name:evId,icon:"⚡",color:"#44ffcc"};return React.createElement('span', { key: evId, style: {fontSize:10,padding:"2px 8px",background:ev.color+"22",border:"1px solid "+ev.color+"55",color:ev.color,borderRadius:3},}, ev.icon, " " , ev.name, " " , eventTimers[evId]||0, "s");})
                  , gmBounties.filter(b=>!b.done).map(b=>React.createElement('span', { key: b.id, style: {fontSize:10,padding:"2px 8px",background:"rgba(255,215,0,0.1)",border:"1px solid #aa8800",color:"#ffd700",borderRadius:3},}, "📋 " , b.name, ": " , b.progress||0, "/", b.goal))
                )
              )
            )
          )

          , React.createElement('div', { style: {flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},}

            , gameView==="world"&&(
              React.createElement('div', { style: {flex:1,padding:16,overflowY:"auto"},}
                , React.createElement('div', { style: {background:"rgba(0,0,0,0.3)",border:"1px solid #2a1e0a",borderRadius:6,padding:18,marginBottom:14,animation:"slideUp 0.3s ease"},}
                  , React.createElement('div', { style: {fontSize:14,color:regData.accent,marginBottom:6,letterSpacing:2},}, "📍 " , region)
                  , React.createElement('div', { style: {fontSize:12,color:"#9a8070",lineHeight:1.6,marginBottom:8},}, regData.desc)
                  , React.createElement('div', { style: {fontSize:11,color:"#5a4030",marginBottom:6},}, "⚠️ "+"★".repeat(regData.danger)+" · "+regData.mobs.join(", "))
                  , React.createElement('div', { style: {fontSize:10,padding:"4px 8px",background:"rgba(0,0,0,0.3)",borderRadius:3,color:"#5a6070",borderLeft:"2px solid #4a5a30"},}, wIcon, " " , wfx.label)
                  , isNight&&React.createElement('div', { style: {marginTop:5,fontSize:10,padding:"4px 8px",background:"rgba(40,0,80,0.3)",borderRadius:3,color:"#8855cc",borderLeft:"2px solid #6633aa"},}, "🌙 Night: +20% enemy ATK · +50% XP"       )
                  , escortNPC&&React.createElement('div', { style: {marginTop:5,fontSize:10,padding:"4px 8px",background:"rgba(61,214,140,0.05)",borderRadius:3,color:"#3dd68c",borderLeft:"2px solid #3dd68c"},}, "🤝 GM escort: "   , escortNPC.name, " walks with you."   )
                )
                , React.createElement('div', { style: {display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"},}
                  , React.createElement(Btn, { onClick: explore, disabled: exploring||resting, style: {flex:"3 1 160px",background:"rgba("+regData.accent.replace("#","").match(/.{2}/g).map(h=>parseInt(h,16)).join(",")+ ",0.10)",border:"1px solid "+(exploring||resting?"#2a1e0a":regData.accent),color:exploring||resting?"#5a4030":regData.accent,padding:14,borderRadius:4,fontSize:15,letterSpacing:2,fontFamily:"Georgia,serif",animation:(!exploring&&!resting)?"glow 2s infinite":"none",minHeight:54},}, exploring?"⏳ Exploring...":"⚔️ EXPLORE")
                  , React.createElement(Btn, { onClick: rest, disabled: resting||exploring||!me, style: {flex:"1 1 80px",background:"rgba(85,204,102,0.06)",border:"1px solid "+(resting?"#2a1e0a":"#55cc66"),color:resting?"#5a4030":"#55cc66",padding:"13px 8px",borderRadius:4,fontSize:11,fontFamily:"Georgia,serif",textAlign:"center",minHeight:54},}, resting?"⏳":"⛺", " Rest", me&&React.createElement("span",{style:{display:"block",fontSize:9,color:"#3a6040"}},Math.max(5,Math.floor(me.level*4))+"g"))
                  , React.createElement(Btn, { onClick: enterDungeon, disabled: !!dungeon, style: {flex:"1 1 80px",background:"rgba(232,170,68,0.06)",border:"1px solid "+(dungeon?"#2a1e0a":"#e8aa44"),color:dungeon?"#5a4030":"#e8aa44",padding:"13px 8px",borderRadius:4,fontSize:11,fontFamily:"Georgia,serif",textAlign:"center",minHeight:54},}, "🏰 Dungeon")
                )
                , PARTY_RECRUITS[region]&&(
                  React.createElement('div', { style: {background:"rgba(0,0,0,0.2)",border:"1px solid #55cc6633",borderRadius:4,padding:12,marginBottom:12},}
                    , React.createElement('div', { style: {fontSize:10,color:"#55cc66",letterSpacing:2,marginBottom:8},}, "RECRUIT AVAILABLE" )
                    , party?(
                      React.createElement('div', { style: {display:"flex",alignItems:"center",justifyContent:"space-between"},}
                        , React.createElement('div', { style: {fontSize:12},}, party.icon, " " , party.name, " " , React.createElement('span', { style: {color:"#5a4030",fontSize:11},}, "HP " , party.hp, "/", party.maxHp, " · ATK "   , party.atk))
                        , React.createElement(Btn, { onClick: dismissParty, style: {background:"none",border:"1px solid #ff5533",color:"#ff5533",padding:"3px 8px",borderRadius:3,fontSize:10},}, "Dismiss")
                      )
                    ):(
                      React.createElement('div', { style: {display:"flex",alignItems:"center",justifyContent:"space-between"},}
                        , React.createElement('div', { style: {fontSize:12},}, PARTY_RECRUITS[region].icon, " " , PARTY_RECRUITS[region].name, " " , React.createElement('span', { style: {color:"#5a4030",fontSize:11},}, "ATK " , PARTY_RECRUITS[region].atk))
                        , React.createElement(Btn, { onClick: recruitParty, disabled: !me||me.gold<PARTY_RECRUITS[region].cost, style: {background:"rgba(85,204,102,0.08)",border:"1px solid "+(me&&me.gold>=PARTY_RECRUITS[region].cost?"#55cc66":"#2a2a1a"),color:me&&me.gold>=PARTY_RECRUITS[region].cost?"#55cc66":"#5a4030",padding:"4px 10px",borderRadius:3,fontSize:11},}, "Recruit " , PARTY_RECRUITS[region].cost, "g")
                      )
                    )
                  )
                )
                , npcPlayers.filter(n=>n.region===region&&n.status==="online").length>0&&(
                  React.createElement('div', { style: {background:"rgba(0,0,0,0.2)",border:"1px solid #1a1208",borderRadius:4,padding:12,marginBottom:12},}
                    , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:8},}, "NEARBY PLAYERS "  , pvpEnabled&&React.createElement('span', { style: {color:"#ff2244"},}, "· PvP ON"  ))
                    , npcPlayers.filter(n=>n.region===region&&n.status==="online").map(n=>(
                      React.createElement('div', { key: n.id, style: {display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4},}
                        , React.createElement('span', { style: {fontSize:12,color:"#9a8070"},}, React.createElement('span', { style: {color:"#55cc66"},}, "●"), " " , n.name, " · Lv."  , n.level, " " , n.cls)
                        , pvpEnabled&&React.createElement(Btn, { onClick: ()=>{var nc=CLASSES[n.cls];var lm=n.level/50+0.5;var e={name:n.name,icon:nc.icon,hp:Math.round(nc.hp*lm),maxHp:Math.round(nc.hp*lm),atk:Math.round(nc.atk*lm),xp:n.level*40,gold:n.level*15,desc:"PvP",pvp:true};setEncounter({enemies:[e]});setGameView("combat");setCombatTurn("player");setSelectedTargetIdx(0);gLog("PvP: "+n.name+"!","system");}, style: {background:"rgba(255,34,68,0.1)",border:"1px solid #ff2244",color:"#ff2244",padding:"3px 8px",borderRadius:3,fontSize:10},}, "⚔️")
                      )
                    ))
                  )
                )
                , me&&healItems.length>0&&(
                  React.createElement('div', { style: {background:"rgba(0,0,0,0.2)",border:"1px solid #1a1208",borderRadius:4,padding:10,marginBottom:12},}
                    , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:6},}, "QUICK USE" )
                    , React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:5},}
                      , [...new Set(healItems)].map(item=>React.createElement(Btn, { key: item, onClick: ()=>useItem(item), style: {background:"rgba(0,0,0,0.4)",border:"1px solid #2a1e0a",color:"#d4b896",padding:"4px 9px",borderRadius:3,fontSize:11},}, _optionalChain([ITEMS, 'access', _43 => _43[item], 'optionalAccess', _44 => _44.icon]), " " , item))
                    )
                  )
                )
                , gmBounties.length>0&&(
                  React.createElement('div', { style: {background:"rgba(255,215,0,0.04)",border:"1px solid #aa8800",borderRadius:4,padding:12,marginBottom:12},}
                    , React.createElement('div', { style: {fontSize:10,color:"#ffd700",letterSpacing:2,marginBottom:8},}, "📋 BOUNTIES" )
                    , gmBounties.map(b=>(
                      React.createElement('div', { key: b.id, style: {background:"rgba(0,0,0,0.2)",borderRadius:3,padding:"8px 10px",marginBottom:6,border:"1px solid "+(b.done?"#ffd70055":"#aa880033")},}
                        , React.createElement('div', { style: {display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4},}
                          , React.createElement('div', { style: {fontSize:12,color:b.done?"#ffd700":"#d4b896"},}, b.done?"✅ ":"", b.name)
                          , b.done&&React.createElement(Btn, { onClick: ()=>claimBounty(b), style: {background:"rgba(255,215,0,0.15)",border:"1px solid #ffd700",color:"#ffd700",padding:"3px 8px",borderRadius:3,fontSize:10},}, "CLAIM")
                        )
                        , React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginBottom:4},}, b.desc)
                        , b.progress!==undefined&&!b.done&&React.createElement(React.Fragment, null, React.createElement('div', { style: {fontSize:10,color:"#aa8800",marginBottom:2},}, b.progress||0, "/", b.goal), React.createElement(Bar, { val: b.progress||0, max: b.goal, color: "#ffd700", h: 4,}))
                        , React.createElement('div', { style: {fontSize:10,color:"#5a6040",marginTop:4},}, "Reward: " , b.rewardType==="gold"?b.rewardGold+"g":b.rewardType==="item"?b.rewardItem:"+1 SP")
                      )
                    ))
                  )
                )
              )
            )

            /* COMBAT VIEW */
            , gameView==="combat"&&encounter&&(
              React.createElement('div', { style: {flex:1,padding:16,overflowY:"auto",animation:"slideUp 0.2s ease"},}
                , React.createElement('div', { style: {fontSize:12,color:"#ff5533",letterSpacing:2,marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"},}
                  , React.createElement('span', null, "⚔️ COMBAT "  , _optionalChain([encounter, 'access', _45 => _45.enemies, 'access', _46 => _46[0], 'optionalAccess', _47 => _47.pvp])?"· PvP":"")
                  , React.createElement('span', { style: {fontSize:10,color:"#5a4030"},}, combatTurn==="player"?"Your turn":"Enemy attacking...")
                )
                /* Enemies */
                , React.createElement('div', { style: {display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"},}
                  , encounter.enemies.map((enemy,i)=>(
                    React.createElement('div', { key: i, onClick: ()=>encounter.enemies.length>1&&setSelectedTargetIdx(i), style: {flex:1,minWidth:140,background:"rgba(0,0,0,0.4)",border:"2px solid "+(i===selectedTargetIdx?"#ff5533":"#2a1e0a"),borderRadius:6,padding:14,cursor:encounter.enemies.length>1?"pointer":"default",transition:"border-color 0.2s"},}
                      , encounter.enemies.length>1&&React.createElement('div', { style: {fontSize:9,color:i===selectedTargetIdx?"#ff5533":"#5a4030",marginBottom:4,letterSpacing:2},}, i===selectedTargetIdx?"🎯 TARGET":"")
                      , React.createElement('div', { style: {fontSize:32,marginBottom:8,textAlign:"center",animation:enemy.hp<enemy.maxHp*0.3?"bossShake 0.5s infinite":""},}, enemy.icon||"👹")
                      , React.createElement('div', { style: {fontSize:12,color:"#d4b896",fontWeight:"bold",textAlign:"center",marginBottom:6},}, enemy.name, enemy.boss&&React.createElement('span', { style: {fontSize:9,color:"#ff4433",marginLeft:4},}, "⚠️ BOSS" ))
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",textAlign:"center",marginBottom:6},}, "ATK " , enemy.atk)
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginBottom:4},}, "HP " , enemy.hp, "/", enemy.maxHp)
                      , React.createElement(Bar, { val: enemy.hp, max: enemy.maxHp, color: enemy.hp<enemy.maxHp*0.3?"#ff5533":enemy.hp<enemy.maxHp*0.6?"#e8aa44":"#55cc66",})
                      , React.createElement('div', { style: {marginTop:6,display:"flex",gap:4,flexWrap:"wrap"},}
                        , enemy.poisoned&&React.createElement('span', { style: {fontSize:9,color:"#88ff44",border:"1px solid #44aa22",padding:"0 3px",borderRadius:2},}, "☠")
                        , enemy.blinded&&React.createElement('span', { style: {fontSize:9,color:"#aaaaff",border:"1px solid #4444aa",padding:"0 3px",borderRadius:2},}, "👁")
                        , enemy.weakened&&React.createElement('span', { style: {fontSize:9,color:"#ffaa44",border:"1px solid #aa6622",padding:"0 3px",borderRadius:2},}, "💢")
                        , enemy.frozen&&React.createElement('span', { style: {fontSize:9,color:"#88ddff",border:"1px solid #2288aa",padding:"0 3px",borderRadius:2},}, "❄️")
                      )
                    )
                  ))
                )
                /* Combat actions */
                , combatTurn==="player"&&(
                  React.createElement('div', { style: {marginBottom:14},}
                    , comboCount>0&&(
                      React.createElement('div', { style: {marginBottom:8,padding:"5px 10px",background:"rgba(232,170,68,0.08)",border:"1px solid #e8aa4444",borderRadius:4,display:"flex",alignItems:"center",gap:8},}
                        , React.createElement('span', { style: {fontSize:11,color:comboCount>=4?"#ff4422":comboCount>=3?"#ff8822":comboCount>=2?"#ffcc22":"#e8aa44",fontWeight:"bold"},}
                          , comboCount>=4?"💥":comboCount>=3?"🔥":comboCount>=2?"⚡":"▶", " COMBO ×"  , comboCount+1
                        )
                        , React.createElement('span', { style: {fontSize:10,color:"#5a4030"},}, Math.round((comboMult-1)*100), "% bonus dmg"  )
                        , React.createElement('div', { style: {flex:1,display:"flex",gap:3},}, [0,1,2,3,4].map(i=>React.createElement('div', { key: i, style: {flex:1,height:4,background:i<=comboCount-1?"#e8aa44":"#2a1e0a",borderRadius:2,transition:"background 0.2s"},})))
                      )
                    )
                    , React.createElement('div', { style: {display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"},}
                      , React.createElement(Btn, { onClick: ()=>playerAttack("attack"), style: {flex:2,background:"rgba(232,170,68,0.1)",border:"1px solid #e8aa44",color:"#e8aa44",padding:"14px 10px",borderRadius:4,fontSize:14,fontFamily:"Georgia,serif",minHeight:52,textAlign:"center"},}, _optionalChain([clsData, 'optionalAccess', _48 => _48.attackIcon])||"⚔️", " " , _optionalChain([clsData, 'optionalAccess', _49 => _49.attackLabel])||"Attack")
                      , React.createElement(Btn, { onClick: ()=>playerAttack("ability"), disabled: me&&me.mana<(_optionalChain([clsData, 'optionalAccess', _50 => _50.abilityCost])||0), style: {flex:2,background:"rgba(170,68,255,0.1)",border:"1px solid "+(me&&me.mana>=(_optionalChain([clsData, 'optionalAccess', _51 => _51.abilityCost])||0)?"#aa44ff":"#3a2050"),color:me&&me.mana>=(_optionalChain([clsData, 'optionalAccess', _52 => _52.abilityCost])||0)?"#aa44ff":"#4a3060",padding:"14px 10px",borderRadius:4,fontSize:13,fontFamily:"Georgia,serif",minHeight:52,textAlign:"center"},}, _optionalChain([clsData, 'optionalAccess', _53 => _53.ability])||"Ability", " (", _optionalChain([clsData, 'optionalAccess', _54 => _54.abilityCost]), "MP)")
                    )
                    , React.createElement('div', { style: {display:"flex",gap:8},}
                      , React.createElement(Btn, { onClick: ()=>setCombatItemOpen(v=>!v), disabled: !hasAnyItems, style: {flex:2,background:"rgba(68,136,255,0.1)",border:"1px solid "+(hasAnyItems?"#4488ff":"#1a2040"),color:hasAnyItems?"#4488ff":"#2a3060",padding:"12px 10px",borderRadius:4,fontSize:13,minHeight:50},}, "🧪 Items "  , hasAnyItems&&"("+me.inventory.filter(i=>_optionalChain([ITEMS, 'access', _55 => _55[i], 'optionalAccess', _56 => _56.type])==="consumable"||_optionalChain([ITEMS, 'access', _57 => _57[i], 'optionalAccess', _58 => _58.type])==="offensive").length+")")
                      , learnedSpells.length>0&&React.createElement(Btn, { onClick: ()=>setSpellCastOpen(v=>!v), style: {flex:2,background:"rgba(170,68,255,0.1)",border:"1px solid #aa44ff",color:"#aa44ff",padding:10,borderRadius:4,fontSize:12},}, "📖 Spells ("  , learnedSpells.length, ")")
                      , React.createElement(Btn, { onClick: ()=>playerAttack("flee"), style: {flex:1,background:"rgba(90,64,48,0.2)",border:"1px solid #5a4030",color:"#7a6050",padding:"12px 10px",borderRadius:4,fontSize:13,minHeight:50},}, "🏃 Flee" )
                    )
                    , combatItemOpen&&(
                      React.createElement('div', { style: {marginTop:10,background:"rgba(0,0,0,0.4)",border:"1px solid #2a1e0a",borderRadius:4,padding:10},}
                        , healItems.length>0&&React.createElement(React.Fragment, null, React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:6},}, "HEAL"), React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:5,marginBottom:10},}, [...new Set(healItems)].map(item=>React.createElement(Btn, { key: item, onClick: ()=>useItem(item), style: {background:"rgba(85,204,102,0.08)",border:"1px solid #2a3a2a",color:"#d4b896",padding:"8px 12px",borderRadius:3,fontSize:12,minHeight:40},}, _optionalChain([ITEMS, 'access', _59 => _59[item], 'optionalAccess', _60 => _60.icon]), " " , item))))
                        , offItems.length>0&&React.createElement(React.Fragment, null, React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:6},}, "OFFENSIVE"), React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:5},}, [...new Set(offItems)].map(item=>React.createElement(Btn, { key: item, onClick: ()=>useOffensiveItem(item), style: {background:"rgba(255,80,50,0.08)",border:"1px solid #3a2a1a",color:"#d4b896",padding:"8px 12px",borderRadius:3,fontSize:12,minHeight:40},}, _optionalChain([ITEMS, 'access', _61 => _61[item], 'optionalAccess', _62 => _62.icon]), " " , item))))
                      )
                    )
                  )
                )
                , combatTurn==="enemy"&&React.createElement('div', { style: {padding:14,textAlign:"center",color:"#5a4030",fontSize:12,animation:"pulse 0.8s infinite"},}, "Enemy attacking..." )
                , spellCastOpen&&combatTurn==="player"&&(
                  React.createElement('div', { style: {marginTop:8,background:"rgba(0,0,0,0.5)",border:"1px solid #aa44ff55",borderRadius:4,padding:10},}
                    , React.createElement('div', { style: {fontSize:10,color:"#aa44ff",letterSpacing:2,marginBottom:8},}, "📖 CAST SPELL"  )
                    , React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:6},}
                      , (SPELLS[me.cls]||[]).filter(s=>learnedSpells.includes(s.id)).map(spell=>(
                        React.createElement(Btn, { key: spell.id, onClick: ()=>castSpell(spell.id), disabled: me.mana<spell.cost, style: {background:"rgba(170,68,255,0.1)",border:"1px solid "+(me.mana>=spell.cost?"#aa44ff":"#3a2050"),color:me.mana>=spell.cost?"#aa44ff":"#4a3060",padding:"6px 10px",borderRadius:3,fontSize:11},}
                          , spell.icon, " " , spell.name, React.createElement('br', null)
                          , React.createElement('span', { style: {fontSize:9,color:"#5a4030"},}, spell.cost, "MP · "  , spell.desc.split("–")[0])
                        )
                      ))
                    )
                  )
                )
                , me&&React.createElement('div', { style: {marginTop:4,padding:"6px 0",borderTop:"1px solid #2a1e0a",fontSize:11,color:"#5a4030",display:"flex",gap:12},}, React.createElement('span', null, "ATK " , me.atk), React.createElement('span', null, "MAG " , me.mag), React.createElement('span', null, "Dodge " , dodgePct, "%"), React.createElement('span', null, "HP " , me.hp, "/", me.maxHp))
              )
            )

            , gameView==="dungeon"&&dungeon&&(
              React.createElement('div', { style: {flex:1,padding:16,overflowY:"auto"},}
                , React.createElement('div', { style: {fontSize:14,color:"#e8aa44",marginBottom:4,letterSpacing:2},}, "🏰 " , dungeon.name)
                , React.createElement('div', { style: {fontSize:11,color:"#5a4030",marginBottom:14},}, "Room " , Math.min(dungeon.roomIdx+1,dungeon.rooms.length), "/", dungeon.rooms.length, " · Reward: "   , dungeon.reward.toLocaleString(), "g")
                , dungeon.rooms.map((room,i)=>{
                  var isCurrent=i===dungeon.roomIdx;var locked=i>dungeon.roomIdx;
                  var icons={combat:"⚔️",boss:"💀",treasure:"💎",rest:"⛺"};
                  var colors={combat:"#3a2a1a",boss:"#3a0808",treasure:"#2a3a1a",rest:"#1a2a1a"};
                  var ac={combat:"#e8aa44",boss:"#ff4433",treasure:"#ffd700",rest:"#55cc66"};
                  return(
                    React.createElement('div', { key: room.id, onClick: ()=>isCurrent&&!room.done&&enterDungeonRoom(room), style: {display:"flex",alignItems:"center",gap:12,padding:"12px 14px",marginBottom:8,background:room.done?"rgba(0,0,0,0.1)":locked?"rgba(0,0,0,0.1)":colors[room.type],border:"1px solid "+(isCurrent&&!room.done?ac[room.type]:"#2a1e0a"),borderRadius:4,cursor:isCurrent&&!room.done?"pointer":"default",opacity:locked?0.4:1,transition:"all 0.2s"},}
                      , React.createElement('div', { style: {fontSize:24,minWidth:32,textAlign:"center"},}, room.done?"✅":locked?"🔒":icons[room.type])
                      , React.createElement('div', { style: {flex:1},}
                        , React.createElement('div', { style: {fontSize:12,color:room.done?"#5a4030":isCurrent?ac[room.type]:"#7a6050",fontWeight:isCurrent?"bold":"normal"},}, "Room " , i+1, ": " , room.type==="boss"?"⚠️ BOSS — "+dungeon.boss:room.type.charAt(0).toUpperCase()+room.type.slice(1))
                        , isCurrent&&!room.done&&React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginTop:2},}, "Click to enter"  )
                      )
                      , isCurrent&&!room.done&&React.createElement('span', { style: {fontSize:20,color:ac[room.type]},}, "→")
                    )
                  );
                })
                , React.createElement(Btn, { onClick: ()=>{setDungeon(null);dungeonRef.current=null;setGameView("world");gLog("Left the dungeon.","warn");}, style: {width:"100%",marginTop:8,background:"rgba(90,64,48,0.2)",border:"1px solid #5a4030",color:"#7a6050",padding:10,borderRadius:4,fontSize:12},}, "⬅ Abandon Dungeon"  )
              )
            )

            , gameView==="map"&&(
              React.createElement('div', { style: {flex:1,padding:16,overflowY:"auto"},}
                , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:12},}, "WORLD MAP — FAST TRAVEL"    )
                , React.createElement('div', { className:"map-grid", style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},}
                  , Object.entries(REGIONS).map(([name,data])=>{
                    var locked=lockedRegions.includes(name);var req=data.minLevel||1;
                    var tooLow=me&&me.level<req;var isCurrent=region===name;
                    return(
                      React.createElement('div', { key: name, onClick: ()=>!locked&&!tooLow&&travelTo(name), style: {background:"rgba(0,0,0,0.3)",border:"2px solid "+(isCurrent?data.accent:locked?"#5a1a1a":tooLow?"#2a2a1a":"#2a1e0a"),borderRadius:6,padding:"12px 14px",cursor:(locked||tooLow)?"not-allowed":"pointer",opacity:locked||tooLow?0.6:1,transition:"border-color 0.2s"},}
                        , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},}
                          , React.createElement('div', { style: {fontSize:12,color:isCurrent?data.accent:locked?"#5a3030":tooLow?"#5a5a30":"#d4b896",fontWeight:isCurrent?"bold":"normal"},}, name)
                          , React.createElement('div', { style: {fontSize:10,color:"#5a4030"},}, "★".repeat(data.danger))
                        )
                        , React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginBottom:3},}, "Lv.", req, "+ req" )
                        , isCurrent&&React.createElement('div', { style: {fontSize:9,color:data.accent,letterSpacing:2},}, "📍 YOU ARE HERE"   )
                        , locked&&React.createElement('div', { style: {fontSize:9,color:"#ff4444"},}, "🔒 GM LOCKED"  )
                        , !locked&&tooLow&&React.createElement('div', { style: {fontSize:9,color:"#ff5533"},}, "🔒 LEVEL "  , req, " REQ" )
                        , DUNGEON_DATA[name]&&React.createElement('div', { style: {fontSize:9,color:"#e8aa4488",marginTop:2},}, "🏰 Dungeon available"  )
                      )
                    );
                  })
                )
              )
            )

            /* INVENTORY VIEW */
            , gameView==="inventory"&&me&&(
              React.createElement('div', { style: {flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},}
                , React.createElement('div', { style: {display:"flex",borderBottom:"1px solid #2a1e0a",flexShrink:0},}
                  , [["equip","Equipment"],["items","Inventory"],["skills","Skills"],["spells","Spells"],["craft","Craft"],["upgrade","Upgrade"]].map(([v,label])=>(
                    React.createElement(Btn, { key: v, onClick: ()=>setInvTab(v), style: {flex:1,background:invTab===v?"rgba(232,170,68,0.1)":"none",border:"none",borderRight:"1px solid #2a1e0a",borderBottom:invTab===v?"2px solid #e8aa44":"2px solid transparent",color:invTab===v?"#e8aa44":"#5a4030",padding:"8px 4px",fontSize:10,letterSpacing:1,fontFamily:"monospace"},}, label)
                  ))
                )
                , React.createElement('div', { style: {flex:1,padding:12,overflowY:"auto"},}
                  , invTab==="equip"&&(
                    React.createElement('div', null
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:10},}, "STATS")
                      , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14},}
                        , [["⚔️ ATK",me.atk],["✨ MAG",me.mag],["💧 Mana",me.mana+"/"+me.maxMana],["💨 SPD",me.spd],["❤️ MaxHP",me.maxHp],["💰 Gold",me.gold.toLocaleString()]].map(([k,v])=>(
                          React.createElement('div', { key: k, style: {background:"rgba(0,0,0,0.3)",border:"1px solid #2a1e0a",borderRadius:3,padding:"8px 10px",display:"flex",justifyContent:"space-between"},}
                            , React.createElement('span', { style: {fontSize:11,color:"#7a6050"},}, k)
                            , React.createElement('span', { style: {fontSize:11,color:"#e8aa44",fontWeight:"bold"},}, v)
                          )
                        ))
                      )
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:8},}, "EQUIPPED")
                      , (me.equipped||[]).length===0&&React.createElement('div', { style: {fontSize:11,color:"#3a2a1a",padding:"10px 0"},}, "Nothing equipped." )
                      , (me.equipped||[]).map(item=>(
                        React.createElement('div', { key: item, style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:"rgba(0,0,0,0.3)",border:"1px solid #2a2a1a",borderRadius:3,marginBottom:6},}
                          , React.createElement('span', { style: {fontSize:12},}, _optionalChain([ITEMS, 'access', _63 => _63[item], 'optionalAccess', _64 => _64.icon]), " " , item)
                          , React.createElement('span', { style: {fontSize:11,color:"#e8aa44"},}, _optionalChain([ITEMS, 'access', _65 => _65[item], 'optionalAccess', _66 => _66.desc]))
                          , React.createElement(Btn, { onClick: ()=>unequipItem(item), style: {background:"none",border:"1px solid #5a4030",color:"#7a6050",padding:"3px 6px",borderRadius:2,fontSize:10},}, "Unequip")
                        )
                      ))
                    )
                  )
                  , invTab==="items"&&(
                    React.createElement('div', null
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:10},}, "INVENTORY (" , me.inventory.length, " items)" )
                      , me.inventory.length===0&&React.createElement('div', { style: {fontSize:11,color:"#3a2a1a"},}, "Empty.")
                      , Object.entries(me.inventory.reduce((acc,i)=>{acc[i]=(acc[i]||0)+1;return acc;},{})).map(([item,count])=>{
                        var data=ITEMS[item]||{};
                        return(
                          React.createElement('div', { key: item, style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:"rgba(0,0,0,0.3)",border:"1px solid #2a1e0a",borderRadius:3,marginBottom:6},}
                            , React.createElement('div', { style: {flex:1},}, React.createElement('div', { style: {fontSize:12},}, data.icon||"📦", " " , item, " " , count>1&&React.createElement('span', { style: {color:"#5a4030",fontSize:10},}, "×", count)), React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginTop:2},}, data.desc||""))
                            , React.createElement('div', { style: {display:"flex",gap:5},}
                              , data.type==="weapon"||data.type==="armor"?React.createElement(Btn, { onClick: ()=>(me.equipped||[]).includes(item)?unequipItem(item):equipItem(item), style: {background:"rgba(232,170,68,0.08)",border:"1px solid #e8aa44",color:"#e8aa44",padding:"3px 8px",borderRadius:2,fontSize:10},}, (me.equipped||[]).includes(item)?"Unequip":"Equip"):null
                              , data.type==="consumable"?React.createElement(Btn, { onClick: ()=>useItem(item), style: {background:"rgba(85,204,102,0.08)",border:"1px solid #55cc66",color:"#55cc66",padding:"3px 8px",borderRadius:2,fontSize:10},}, "Use"):null
                            )
                          )
                        );
                      })
                    )
                  )
                  , invTab==="skills"&&(
                    React.createElement('div', null
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:4},}, "SKILL POINTS: "  , React.createElement('span', { style: {color:"#aa88ff"},}, skillPoints))
                      , React.createElement('div', { style: {fontSize:10,color:"#4a3028",marginBottom:12},}, "Class-gated skills are highlighted. Gray = not available for "         , me.cls, ".")
                      , Object.entries(SKILL_TREE).map(([name,skill])=>{
                        var rank=learnedSkills[name]||0;var classLocked=skill.classes&&!skill.classes.includes(me.cls);
                        return(
                          React.createElement('div', { key: name, style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:"rgba(0,0,0,0.3)",border:"1px solid "+(classLocked?"#2a2020":"#2a1e0a"),borderRadius:4,marginBottom:6,opacity:classLocked?0.45:1},}
                            , React.createElement('div', { style: {flex:1},}
                              , React.createElement('div', { style: {fontSize:12,color:classLocked?"#5a4040":"#d4b896"},}, skill.icon, " " , name, " " , rank>0&&React.createElement('span', { style: {color:"#aa88ff"},}, "R", rank, "/", skill.maxRank))
                              , React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginTop:2},}, skill.desc)
                              , classLocked&&React.createElement('div', { style: {fontSize:9,color:"#7a3030",marginTop:2},}, "🔒 " , _optionalChain([skill, 'access', _67 => _67.classes, 'optionalAccess', _68 => _68.join, 'call', _69 => _69("/")]), " only" )
                              , !classLocked&&skill.classes&&React.createElement('div', { style: {fontSize:9,color:"#5a6030",marginTop:2},}, "For: " , skill.classes.join(", "))
                            )
                            , React.createElement(Btn, { onClick: ()=>learnSkill(name), disabled: classLocked||rank>=skill.maxRank||skillPoints<skill.cost, style: {background:"rgba(170,68,255,0.1)",border:"1px solid "+(classLocked||rank>=skill.maxRank||skillPoints<skill.cost?"#3a2050":"#aa44ff"),color:classLocked||rank>=skill.maxRank||skillPoints<skill.cost?"#4a3060":"#aa44ff",padding:"4px 10px",borderRadius:3,fontSize:11,minWidth:60,textAlign:"center"},}, rank>=skill.maxRank?"MAX":classLocked?"🔒":"Learn ("+skill.cost+"SP)")
                          )
                        );
                      })
                    )
                  )
                  , invTab==="craft"&&(
                    React.createElement('div', null
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:12},}, "CRAFTING")
                      , CRAFT_RECIPES.map(recipe=>{
                        var canCraft=recipe.requires.every(r=>me.inventory.includes(r));
                        return(
                          React.createElement('div', { key: recipe.name, style: {padding:"10px 12px",background:"rgba(0,0,0,0.3)",border:"1px solid "+(canCraft?"#44ffcc33":"#2a1e0a"),borderRadius:4,marginBottom:8},}
                            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6},}
                              , React.createElement('div', { style: {fontSize:12,color:canCraft?"#44ffcc":"#7a6050"},}, recipe.icon, " " , recipe.name)
                              , React.createElement(Btn, { onClick: ()=>craftItem(recipe), disabled: !canCraft, style: {background:canCraft?"rgba(68,255,204,0.08)":"rgba(0,0,0,0.2)",border:"1px solid "+(canCraft?"#44ffcc":"#2a1e0a"),color:canCraft?"#44ffcc":"#5a4030",padding:"3px 10px",borderRadius:3,fontSize:11},}, "Craft")
                            )
                            , React.createElement('div', { style: {fontSize:10,color:"#5a4030"},}, "Needs: " , recipe.requires.map(r=>React.createElement('span', { key: r, style: {color:me.inventory.includes(r)?"#55cc66":"#ff5533",marginRight:6},}, "● "+r)))
                          )
                        );
                      })
                    )
                  )
                  , invTab==="spells"&&(
                    React.createElement('div', null
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:4},}, "SPELL TOME" )
                      , React.createElement('div', { style: {fontSize:10,color:"#4a3028",marginBottom:12},}
                        , (SPELLS[me.cls]||[]).length===0?"Your class has no spells.":"Spells unlock as you level up. Use in combat."
                      )
                      , (SPELLS[me.cls]||[]).map(spell=>{
                        var unlocked=learnedSpells.includes(spell.id);
                        return(
                          React.createElement('div', { key: spell.id, style: {padding:"10px 12px",background:"rgba(0,0,0,0.3)",border:"1px solid "+(unlocked?"#aa44ff44":"#2a1e0a"),borderRadius:4,marginBottom:8,opacity:unlocked?1:0.45},}
                            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},}
                              , React.createElement('div', { style: {fontSize:13,color:unlocked?"#aa44ff":"#5a4030"},}, spell.icon, " " , spell.name)
                              , React.createElement('div', { style: {fontSize:10,color:"#5a4030"},}, spell.cost, " MP · Lv."   , spell.lvl)
                            )
                            , React.createElement('div', { style: {fontSize:10,color:"#7a6050"},}, spell.desc)
                            , spell.multi&&React.createElement('div', { style: {fontSize:9,color:"#ff8844",marginTop:3},}, "⚡ Hits ALL enemies"   )
                            , spell.drain>0&&React.createElement('div', { style: {fontSize:9,color:"#55cc66",marginTop:3},}, "💚 Drains "  , Math.round(spell.drain*100), "% dmg as HP"   )
                            , !unlocked&&React.createElement('div', { style: {fontSize:9,color:"#aa44ff",marginTop:3},}, "🔒 Unlocks at Level "    , spell.lvl)
                            , unlocked&&React.createElement('div', { style: {fontSize:9,color:"#55cc66",marginTop:3},}, "✅ Available in combat"   )
                          )
                        );
                      })
                      , (SPELLS[me.cls]||[]).length===0&&(
                        React.createElement('div', { style: {padding:20,textAlign:"center",color:"#3a2a1a",fontSize:12},}, "Only Mage and Necromancer have spell tomes."
                                , React.createElement('br', null)
                          , React.createElement('span', { style: {fontSize:10,color:"#5a4030"},}, "Prestige system coming in v7."    )
                        )
                      )
                    )
                  )
                  , invTab==="upgrade"&&(
                    React.createElement('div', null
                      , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:4},}, "EQUIPMENT UPGRADE" )
                      , React.createElement('div', { style: {fontSize:10,color:"#4a3028",marginBottom:12},}, "Upgrade Stones: T1→T2. Dragon Cores: T2→T3."     )
                      , Object.entries(UPGRADE_PATHS).filter(([itemName])=>me.inventory.includes(itemName)).map(([itemName,path])=>{
                        var hasReq=me.inventory.includes(path.req);var hasGold=me.gold>=path.cost;var can=hasReq&&hasGold;
                        return(
                          React.createElement('div', { key: itemName, style: {padding:"10px 12px",background:"rgba(0,0,0,0.3)",border:"1px solid "+(can?"#44ffcc33":"#2a1e0a"),borderRadius:4,marginBottom:8},}
                            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6},}
                              , React.createElement('div', { style: {fontSize:12,color:can?"#44ffcc":"#7a6050"},}, _optionalChain([ITEMS, 'access', _70 => _70[itemName], 'optionalAccess', _71 => _71.icon]), " " , itemName, " → "  , _optionalChain([ITEMS, 'access', _72 => _72[path.to], 'optionalAccess', _73 => _73.icon]), " " , path.to)
                              , React.createElement(Btn, { onClick: ()=>upgradeItem(itemName), disabled: !can, style: {background:can?"rgba(68,255,204,0.08)":"rgba(0,0,0,0.2)",border:"1px solid "+(can?"#44ffcc":"#2a1e0a"),color:can?"#44ffcc":"#5a4030",padding:"3px 10px",borderRadius:3,fontSize:11},}, "Upgrade")
                            )
                            , React.createElement('div', { style: {fontSize:10,color:"#5a4030"},}, "Cost: " , React.createElement('span', { style: {color:hasGold?"#ffd700":"#ff5533"},}, path.cost, "g"), " + "  , React.createElement('span', { style: {color:hasReq?"#55cc66":"#ff5533"},}, path.req))
                            , React.createElement('div', { style: {fontSize:10,color:"#44ffcc88",marginTop:4},}, _optionalChain([ITEMS, 'access', _74 => _74[path.to], 'optionalAccess', _75 => _75.desc]))
                          )
                        );
                      })
                      , !Object.keys(UPGRADE_PATHS).some(k=>me.inventory.includes(k))&&React.createElement('div', { style: {fontSize:11,color:"#3a2a1a"},}, "No upgradeable items in inventory."    )
                    )
                  )
                )
              )
            )

            , gameView==="quests"&&(
              React.createElement('div', { style: {flex:1,padding:12,overflowY:"auto"},}
                , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:12},}, "QUESTS & OBJECTIVES"  )
                , quests.map(q=>(
                  React.createElement('div', { key: q.id, style: {padding:"10px 12px",background:"rgba(0,0,0,0.3)",border:"1px solid "+(q.done?"#55cc6633":"#2a1e0a"),borderRadius:4,marginBottom:8,opacity:q.done?0.6:1},}
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},}
                      , React.createElement('div', { style: {fontSize:12,color:q.done?"#55cc66":"#d4b896",fontWeight:q.done?"normal":"bold"},}, q.done?"✅ ":"", q.name)
                      , React.createElement('div', { style: {fontSize:10,color:"#ffd700"},}, "+", q.reward, "g")
                    )
                    , React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginBottom:q.progress!==undefined&&!q.done?6:0},}, q.desc)
                    , q.progress!==undefined&&!q.done&&(
                      React.createElement(React.Fragment, null, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",fontSize:10,color:"#aa8800",marginBottom:3},}, React.createElement('span', null, "Progress"), React.createElement('span', null, q.progress||0, "/", q.goal)), React.createElement(Bar, { val: q.progress||0, max: q.goal, color: "#e8aa44", h: 4,}))
                    )
                  )
                ))
              )
            )

            , gameView==="shop"&&(
              React.createElement('div', { style: {flex:1,padding:12,overflowY:"auto"},}
                , React.createElement('div', { style: {marginBottom:14},}
                  , React.createElement('div', { style: {fontSize:13,color:"#e8aa44",marginBottom:2},}, _optionalChain([REGION_SHOPS, 'access', _76 => _76[region], 'optionalAccess', _77 => _77.merchant])||"Merchant")
                  , React.createElement('div', { style: {fontSize:11,color:"#7a6050",marginBottom:12,fontStyle:"italic"},}, _optionalChain([REGION_SHOPS, 'access', _78 => _78[region], 'optionalAccess', _79 => _79.flavor]))
                  , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:8},}, "BUY")
                  , React.createElement('div', { className:"shop-grid", style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},}
                    , getShopBuyList().map(item=>{
                      var price=_optionalChain([SHOP_PRICES, 'access', _80 => _80[item], 'optionalAccess', _81 => _81.buy])||100;var data=ITEMS[item]||{};var isGMItem=gmShopMods.some(m=>m.item===item&&(m.shop==="all"||m.shop===region)&&(m.permanent||Date.now()<m.expiresAt));
                      return(
                        React.createElement('div', { key: item, style: {background:"rgba(0,0,0,0.3)",border:"1px solid "+(isGMItem?"#44aaff44":"#2a1e0a"),borderRadius:3,padding:"8px 10px"},}
                          , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",marginBottom:4},}
                            , React.createElement('span', { style: {fontSize:11},}, data.icon||"📦", " " , item)
                            , isGMItem&&React.createElement('span', { style: {fontSize:8,color:"#44aaff",border:"1px solid #44aaff44",padding:"0 3px",borderRadius:1},}, "GM")
                          )
                          , React.createElement('div', { style: {fontSize:9,color:"#5a4030",marginBottom:6},}, data.desc)
                          , React.createElement(Btn, { onClick: ()=>shopBuy(item), disabled: !me||me.gold<price, style: {width:"100%",background:"rgba(232,170,68,0.08)",border:"1px solid "+(me&&me.gold>=price?"#e8aa44":"#2a1e0a"),color:me&&me.gold>=price?"#e8aa44":"#5a4030",padding:"4px",borderRadius:2,fontSize:10},}, price, "g Buy" )
                        )
                      );
                    })
                  )
                )
                , React.createElement('div', null
                  , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:8},}, "SELL")
                  , me&&Object.entries(me.inventory.reduce((acc,i)=>{acc[i]=(acc[i]||0)+1;return acc;},{})).filter(([item])=>_optionalChain([SHOP_PRICES, 'access', _82 => _82[item], 'optionalAccess', _83 => _83.sell])).map(([item,count])=>(
                    React.createElement('div', { key: item, style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",background:"rgba(0,0,0,0.3)",border:"1px solid #2a1e0a",borderRadius:3,marginBottom:5},}
                      , React.createElement('span', { style: {fontSize:12},}, _optionalChain([ITEMS, 'access', _84 => _84[item], 'optionalAccess', _85 => _85.icon]), " " , item, " " , count>1&&React.createElement('span', { style: {color:"#5a4030",fontSize:10},}, "×", count))
                      , React.createElement(Btn, { onClick: ()=>shopSell(item), style: {background:"rgba(85,204,102,0.08)",border:"1px solid #55cc66",color:"#55cc66",padding:"3px 8px",borderRadius:2,fontSize:10},}, "+", _optionalChain([SHOP_PRICES, 'access', _86 => _86[item], 'optionalAccess', _87 => _87.sell]), "g")
                    )
                  ))
                )
              )
            )

            , gameView==="achieve"&&(
              React.createElement('div', { style: {flex:1,padding:12,overflowY:"auto"},}
                , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:4},}, "ACHIEVEMENTS")
                , React.createElement('div', { style: {fontSize:10,color:"#3a2a1a",marginBottom:12},}, achievements.length, "/", ACHIEVEMENTS_DEF.length, " unlocked" )
                , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},}
                  , ACHIEVEMENTS_DEF.map(ach=>{var unlocked=achievements.includes(ach.id);return(
                    React.createElement('div', { key: ach.id, style: {background:"rgba(0,0,0,0.3)",border:"1px solid "+(unlocked?"#e8aa4444":"#1a1208"),borderRadius:4,padding:"10px 12px",opacity:unlocked?1:0.4},}
                      , React.createElement('div', { style: {fontSize:22,marginBottom:4},}, ach.icon)
                      , React.createElement('div', { style: {fontSize:11,color:unlocked?"#e8aa44":"#5a4030",fontWeight:unlocked?"bold":"normal"},}, ach.name)
                      , React.createElement('div', { style: {fontSize:9,color:"#5a4030",marginTop:2},}, ach.desc)
                      , unlocked&&React.createElement('div', { style: {fontSize:9,color:"#55cc66",marginTop:3},}, "✅ Unlocked" )
                    )
                  );})
                )
              )
            )

            /* LEADERBOARD VIEW */
            , gameView==="board"&&(
              (() => {
                // Merge real Firebase players with NPC fallback
                var fbPlayers=Object.entries(onlinePlayers).map(([pid,p])=>({name:p.name,cls:p.cls,level:p.level,kills:p.kills||0,gold:p.gold||0,isYou:pid===myUid,online:p.online}));
                var allPlayers= fbPlayers.length>0
                  ? fbPlayers
                  : [...(me?[{name:me.name,cls:me.cls,level:me.level,kills:me.kills,gold:me.gold,isYou:true}]:[]),...npcPlayers.map(n=>({name:n.name,cls:n.cls,level:n.level,kills:n.level*rnd(8,15),gold:n.level*rnd(120,250),isYou:false,status:n.status}))];
              var sorted=[...allPlayers].sort((a,b)=>b[boardSort]-a[boardSort]);
              var medalColors=["#ffd700","#c0c0c0","#cd7f32"];
              return (
                React.createElement('div', { style: {flex:1,padding:12,overflowY:"auto"},}
                  , React.createElement('div', { style: {display:"flex",gap:6,marginBottom:12},}
                    , [["level","⭐ Level"],["kills","⚔️ Kills"],["gold","💰 Gold"]].map(([k,label])=>(
                      React.createElement(Btn, { key: k, onClick: ()=>setBoardSort(k), style: {flex:1,background:boardSort===k?"rgba(232,170,68,0.12)":"none",border:"1px solid "+(boardSort===k?regData.accent:"#2a1e0a"),color:boardSort===k?regData.accent:"#5a4030",padding:"6px",borderRadius:3,fontSize:11},}
                        , label
                      )
                    ))
                  )
                  , React.createElement('div', { style: {fontSize:10,color:"#5a4030",letterSpacing:2,marginBottom:8},}, "🌍 GLOBAL RANKINGS — "  , allPlayers.filter(p=>p.online!==false).length, " ONLINE" )
                  , sorted.map((p,i)=>{
                    var rank=i+1;
                    return(
                      React.createElement('div', { key: p.name+(i), style: {display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:p.isYou?"rgba(232,170,68,0.06)":"rgba(0,0,0,0.25)",border:"1px solid "+(p.isYou?regData.accent:rank<=3?"#2a1e0a":"#1a1208"),borderRadius:4,marginBottom:5},}
                        , React.createElement('div', { style: {fontSize:rank<=3?18:12,minWidth:28,textAlign:"center",color:medalColors[rank-1]||"#5a4030",fontWeight:"bold"},}
                          , rank===1?"🥇":rank===2?"🥈":rank===3?"🥉":"#"+rank
                        )
                        , React.createElement('div', { style: {flex:1,minWidth:0},}
                          , React.createElement('div', { style: {fontSize:12,color:p.isYou?regData.accent:"#d4b896",fontWeight:p.isYou?"bold":"normal"},}
                            , p.name, " " , p.isYou&&"(You)", " " , React.createElement('span', { style: {fontSize:10,color:"#5a4030"},}, p.cls)
                          )
                          , React.createElement('div', { style: {fontSize:10,color:"#5a4030",marginTop:2},}, "Lv."
                            , p.level, " · "  , _optionalChain([p, 'access', _88 => _88.kills, 'optionalAccess', _89 => _89.toLocaleString, 'call', _90 => _90()])||0, " kills · "   , _optionalChain([p, 'access', _91 => _91.gold, 'optionalAccess', _92 => _92.toLocaleString, 'call', _93 => _93()])||0, "g"
                          )
                        )
                        , React.createElement('div', { style: {textAlign:"right",flexShrink:0},}
                          , React.createElement('div', { style: {fontSize:13,color:rank<=3?medalColors[rank-1]:regData.accent,fontWeight:"bold"},}
                            , boardSort==="level"?"Lv."+p.level:boardSort==="kills"?_optionalChain([p, 'access', _94 => _94.kills, 'optionalAccess', _95 => _95.toLocaleString, 'call', _96 => _96()])+"⚔️":"💰"+_optionalChain([p, 'access', _97 => _97.gold, 'optionalAccess', _98 => _98.toLocaleString, 'call', _99 => _99()])
                          )
                          , !p.isYou&&React.createElement('div', { style: {fontSize:9,color:p.status==="offline"?"#3a2a1a":"#55cc66",marginTop:2},}, p.status==="offline"?"● Offline":"● Online")
                        )
                      )
                    );
                  })
                )
              );
            })())

            /* Game Log */
            , React.createElement('div', { ref: gameLogRef, style: {height:120,overflowY:"auto",borderTop:"1px solid #2a1e0a",padding:"8px 12px",background:"rgba(0,0,0,0.4)",flexShrink:0},}
              , gameLog.map((entry,i)=>{
                var colors={system:"#55cc66",gold:"#ffd700",combat:"#e8aa44",warn:"#ff8844",story:"#9a8070",npc:"#7a90a0",xp:"#aa88ff",info:"#7a6050"};
                return React.createElement('div', { key: i, style: {fontSize:10,color:colors[entry.type]||"#7a6050",padding:"1px 0",lineHeight:1.4},}, React.createElement('span', { style: {color:"#3a2a1a",marginRight:6},}, entry.t), entry.msg);
              })
            )
          )
        )

        /* ── GM PANEL (Rebuilt) ─────────────────────────── */
        , React.createElement('div', {style:{position:"fixed",bottom:16,right:16,zIndex:8000}},
          /* Toggle button */
          React.createElement(Btn, {
            onClick:()=>{setIsGMMode(v=>!v);setGmOpen(v=>!v);},
            style:{background:isGMMode?"#0d1117":"rgba(61,214,140,0.08)",border:"2px solid "+(isGMMode?"#3dd68c":"#3dd68c44"),color:isGMMode?"#3dd68c":"#3dd68c88",borderRadius:8,padding:"10px 14px",fontSize:13,fontFamily:"monospace",fontWeight:"bold",display:"flex",alignItems:"center",gap:8,boxShadow:isGMMode?"0 0 20px #3dd68c44":"none"}
          }, "◈", React.createElement('span',{style:{fontSize:10,letterSpacing:2}}, isGMMode?"GM ON":"GM"))
        )
        /* GM sliding panel */
        , isGMMode&&gmOpen&&(
          React.createElement('div', {
            style:{position:"fixed",top:0,right:0,bottom:0,width:"min(100vw,420px)",background:"#07090d",borderLeft:"2px solid #1a2535",zIndex:7900,display:"flex",flexDirection:"column",overflowY:"hidden",boxShadow:"-4px 0 24px rgba(0,0,0,0.8)"}
          },
            /* Header */
            React.createElement('div', {style:{background:"#0d1117",borderBottom:"1px solid #1a2535",padding:"14px 16px",flexShrink:0}},
              React.createElement('div', {style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}},
                React.createElement('div', {style:{display:"flex",alignItems:"center",gap:10}},
                  React.createElement('div', {style:{fontSize:14,color:"#3dd68c",letterSpacing:3,fontFamily:"monospace",fontWeight:"bold"}}, "◈ GM CONSOLE"),
                  roomCode&&React.createElement('div', {style:{fontSize:10,background:"rgba(61,214,140,0.1)",border:"1px solid #1a3525",color:"#3dd68c",padding:"2px 8px",borderRadius:4,fontFamily:"monospace",letterSpacing:2}}, roomCode)
                ),
                React.createElement(Btn, {onClick:()=>setGmOpen(false),style:{background:"none",border:"1px solid #1a2535",color:"#3a5068",padding:"4px 10px",borderRadius:4,fontSize:14}}, "✕")
              ),
              me&&React.createElement('div', {style:{background:"rgba(61,214,140,0.05)",border:"1px solid #1a3025",borderRadius:6,padding:"10px 12px"}},
                React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}},
                  React.createElement('div', {style:{fontSize:13,color:"#3dd68c",fontWeight:"bold"}}, me.name+" · "+me.cls+" Lv."+me.level),
                  React.createElement('div', {style:{fontSize:11,color:"#ffd700"}}, "💰 "+me.gold.toLocaleString()+"g")
                ),
                React.createElement('div', {style:{fontSize:10,color:"#5a8060",marginBottom:4}}, "❤️ "+me.hp+"/"+me.maxHp),
                React.createElement(GBar, {val:me.hp,max:me.maxHp,color:me.hp<me.maxHp*0.25?"#ff4444":me.hp<me.maxHp*0.5?"#ffaa00":"#3dd68c",h:6}),
                React.createElement('div', {style:{fontSize:10,color:"#5a6080",marginTop:5,marginBottom:4}}, "💧 "+me.mana+"/"+me.maxMana),
                React.createElement(GBar, {val:me.mana,max:me.maxMana,color:"#44aaff",h:6}),
                React.createElement('div', {style:{fontSize:10,color:"#3a5068",marginTop:6}},
                  "⚔️ "+region+" · "+Object.keys(onlinePlayers).filter(k=>onlinePlayers[k].online).length+" online · "+(_fbEnabled?"🟢 Firebase":"🟡 Offline"))
              )
            ),
            /* Tab bar */
            React.createElement('div', {style:{display:"flex",borderBottom:"1px solid #1a2535",flexShrink:0,overflowX:"auto"}},
              [["world","🌍 World"],["player","👤 Player"],["spawn","⚔️ Spawn"],["comms","📢 Comms"],["shop","🛍️ Shop"],["create","✦ Create"]].map(([v,label])=>(
                React.createElement(Btn, {key:v,onClick:()=>setGmTab(v),style:{flex:"0 0 auto",padding:"10px 12px",background:gmTab===v?"rgba(61,214,140,0.1)":"none",border:"none",borderBottom:gmTab===v?"2px solid #3dd68c":"2px solid transparent",color:gmTab===v?"#3dd68c":"#3a5068",fontSize:11,fontFamily:"monospace",whiteSpace:"nowrap"}}, label)
              ))
            ),
            /* Tab content */
            React.createElement('div', {style:{flex:1,overflowY:"auto",padding:16,fontSize:12,color:"#b8cfe0"}},

              /* ── WORLD TAB ── */
              gmTab==="world"&&React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:14}},
                /* Quick actions */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "⚡ QUICK ACTIONS"),
                  React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}},
                    React.createElement(Btn, {onClick:()=>fbSendGmCommand('heal_all',{},'all'),style:{background:"rgba(61,214,140,0.08)",border:"1px solid #3dd68c",color:"#3dd68c",padding:"12px 8px",borderRadius:6,fontSize:12,fontFamily:"monospace"}}, "✨ Heal All"),
                    React.createElement(Btn, {onClick:()=>{fbBroadcastWorld({xpMult:3,goldMult:3});setXpMult(3);setGoldMult(3);notify("Bonus weekend ON!","#ffd700");gmLog("Bonus x3 activated","system");},style:{background:"rgba(255,215,0,0.08)",border:"1px solid #ffd700",color:"#ffd700",padding:"12px 8px",borderRadius:6,fontSize:12,fontFamily:"monospace"}}, "🎉 Bonus x3"),
                    React.createElement(Btn, {onClick:()=>{fbBroadcastWorld({xpMult:1,goldMult:1});setXpMult(1);setGoldMult(1);notify("Multipliers reset","#44aaff");},style:{background:"rgba(68,170,255,0.06)",border:"1px solid #44aaff44",color:"#44aaff",padding:"12px 8px",borderRadius:6,fontSize:12,fontFamily:"monospace"}}, "↺ Reset Mults"),
                    React.createElement(Btn, {onClick:()=>setPvpEnabled(v=>{fbBroadcastWorld({pvpEnabled:!v});return !v;}),style:{background:pvpEnabled?"rgba(255,50,50,0.1)":"rgba(0,0,0,0.2)",border:"1px solid "+(pvpEnabled?"#ff3344":"#1a2535"),color:pvpEnabled?"#ff3344":"#3a5068",padding:"12px 8px",borderRadius:6,fontSize:12,fontFamily:"monospace"}}, "⚔️ PvP "+(pvpEnabled?"ON":"OFF"))
                  )
                ),
                /* World events */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "🌍 WORLD EVENTS"),
                  React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:6}},
                    WORLD_EVENTS.map(ev=>{
                      var active=activeEvents.includes(ev.id);
                      return React.createElement('div', {key:ev.id,style:{background:active?"rgba(61,214,140,0.06)":"rgba(0,0,0,0.3)",border:"1px solid "+(active?ev.color+"55":"#1a2535"),borderRadius:6,padding:"10px 12px",display:"flex",alignItems:"center",gap:10}},
                        React.createElement('div', {style:{fontSize:20,minWidth:28}}, ev.icon),
                        React.createElement('div', {style:{flex:1,minWidth:0}},
                          React.createElement('div', {style:{fontSize:12,color:active?ev.color:"#b8cfe0",fontWeight:"bold"}}, ev.name),
                          React.createElement('div', {style:{fontSize:10,color:"#3a5068"}}, active?"Active: "+eventTimers[ev.id]+"s left":ev.desc.slice(0,40))
                        ),
                        React.createElement(Btn, {
                          onClick:()=>{if(active){gmStopEvent(ev.id);fbBroadcastWorld({activeEvents:activeEvents.filter(e=>e!==ev.id)});}else{gmTriggerEvent(ev);fbSendGmCommand('trigger_event',{ev},'all');}},
                          style:{background:active?"rgba(255,68,68,0.1)":"rgba(61,214,140,0.08)",border:"1px solid "+(active?"#ff4444":"#3dd68c"),color:active?"#ff4444":"#3dd68c",padding:"6px 12px",borderRadius:4,fontSize:11,fontFamily:"monospace",whiteSpace:"nowrap"}
                        }, active?"STOP":"▶ START")
                      );
                    })
                  )
                ),
                /* Weather */
                React.createElement('div', null,
                  React.createElement('div', {style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}},
                    React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2}}, "🌤 WEATHER"),
                    React.createElement(Btn, {onClick:()=>setWeatherLocked(v=>!v),style:{background:weatherLocked?"rgba(255,170,0,0.1)":"rgba(0,0,0,0.2)",border:"1px solid "+(weatherLocked?"#ffaa00":"#1a2535"),color:weatherLocked?"#ffaa00":"#3a5068",padding:"4px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, weatherLocked?"🔒":"🔓")
                  ),
                  React.createElement('div', {style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}},
                    Object.keys(WEATHER_EFFECTS).map(w=>(
                      React.createElement(Btn, {key:w,onClick:()=>{if(!weatherLocked){setWeather(w);fbBroadcastWorld({weather:w});gmLog("Weather: "+w,"system");}},
                        style:{background:weather===w?"rgba(61,214,140,0.15)":"rgba(0,0,0,0.3)",border:"1px solid "+(weather===w?"#3dd68c":"#1a2535"),color:weather===w?"#3dd68c":"#5a7080",padding:"8px 4px",borderRadius:4,fontSize:11,fontFamily:"monospace"}}, w)
                    ))
                  )
                ),
                /* Region lockdown */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "🔒 REGION LOCKS"),
                  React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                    Object.keys(REGIONS).map(r=>{
                      var locked=lockedRegions.includes(r);
                      return React.createElement(Btn, {key:r,
                        onClick:()=>{var next=locked?lockedRegions.filter(x=>x!==r):[...lockedRegions,r];setLockedRegions(next);fbBroadcastWorld({lockedRegions:next});},
                        style:{background:locked?"rgba(255,68,68,0.08)":"rgba(0,0,0,0.2)",border:"1px solid "+(locked?"#ff4444":"#1a2535"),color:locked?"#ff4444":"#5a7080",padding:"7px 6px",borderRadius:4,fontSize:10,fontFamily:"monospace"}
                      }, (locked?"🔒 ":"")+r.slice(0,14));
                    })
                  )
                ),
                /* Multipliers */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "✨ MULTIPLIERS"),
                  React.createElement('div', {style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:8}},
                    [1,2,3].map(m=>React.createElement(Btn, {key:"xp"+m,onClick:()=>{setXpMult(m);fbBroadcastWorld({xpMult:m});},style:{background:xpMult===m?"rgba(170,68,255,0.15)":"rgba(0,0,0,0.2)",border:"1px solid "+(xpMult===m?"#aa44ff":"#1a2535"),color:xpMult===m?"#aa44ff":"#3a5068",padding:"8px",borderRadius:4,fontSize:11,fontFamily:"monospace"}}, "XP×"+m))
                  ),
                  React.createElement('div', {style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}},
                    [1,2,5].map(m=>React.createElement(Btn, {key:"g"+m,onClick:()=>{setGoldMult(m);fbBroadcastWorld({goldMult:m});},style:{background:goldMult===m?"rgba(255,215,0,0.1)":"rgba(0,0,0,0.2)",border:"1px solid "+(goldMult===m?"#ffd700":"#1a2535"),color:goldMult===m?"#ffd700":"#3a5068",padding:"8px",borderRadius:4,fontSize:11,fontFamily:"monospace"}}, "Gold×"+m))
                  )
                ),
                /* Spawn rate */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",marginBottom:6}}, "👾 Spawn Rate: "+spawnRate+"%"),
                  React.createElement('input', {type:"range",min:0,max:100,value:spawnRate,onChange:e=>setSpawnRate(+e.target.value),style:{width:"100%",accentColor:"#3dd68c"}})
                )
              ),

              /* ── PLAYER TAB ── */
              gmTab==="player"&&React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:14}},
                /* Online players */
                Object.keys(onlinePlayers).length>0&&React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "👥 ONLINE PLAYERS ("+Object.keys(onlinePlayers).length+")"),
                  React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:6}},
                    Object.entries(onlinePlayers).map(([pid,p])=>(
                      React.createElement('div', {key:pid,style:{background:"rgba(0,0,0,0.3)",border:"1px solid "+(p.online?"#1a3525":"#1a2535"),borderRadius:6,padding:"10px 12px"}},
                        React.createElement('div', {style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}},
                          React.createElement('div', {style:{display:"flex",alignItems:"center",gap:8}},
                            React.createElement('div', {style:{width:8,height:8,borderRadius:"50%",background:p.online?"#3dd68c":"#3a5068"}}),
                            React.createElement('div', {style:{fontSize:12,color:"#b8cfe0",fontWeight:"bold"}}, p.name||"?"),
                            React.createElement('div', {style:{fontSize:10,color:"#3a5068"}}, (p.cls||"?")+
" Lv."+(p.level||1))
                          ),
                          React.createElement('div', {style:{fontSize:10,color:"#5a7060"}}, (p.region||"?").slice(0,12))
                        ),
                        React.createElement('div', {style:{display:"flex",gap:6,flexWrap:"wrap"}},
                          React.createElement(Btn, {onClick:()=>fbSendGmCommand('give_item',{item:"Health Potion"},pid),style:{background:"rgba(61,214,140,0.07)",border:"1px solid #1a3525",color:"#3dd68c",padding:"5px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, "🧪 Potion"),
                          React.createElement(Btn, {onClick:()=>fbSendGmCommand('give_item',{item:"Elixir of Gods"},pid),style:{background:"rgba(255,215,0,0.07)",border:"1px solid #2a2010",color:"#ffd700",padding:"5px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, "✨ Elixir"),
                          React.createElement(Btn, {onClick:()=>fbSendGmCommand('heal_all',{},pid),style:{background:"rgba(61,214,140,0.07)",border:"1px solid #1a3525",color:"#3dd68c",padding:"5px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, "💊 Heal"),
                          React.createElement(Btn, {onClick:()=>fbSendGmCommand('teleport',{region:"Starter Isle"},pid),style:{background:"rgba(170,68,255,0.06)",border:"1px solid #2a1a40",color:"#aa88ff",padding:"5px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, "🌀 TP Isle")
                        )
                      )
                    ))
                  )
                ),
                /* Stat editor */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "⚙️ APPLY STATS TO ALL PLAYERS"),
                  React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}},
                    [["atk","⚔️ ATK"],["mag","✨ MAG"],["hp","❤️ HP"],["mana","💧 Mana"],["level","⭐ Level"],["gold","💰 Gold"]].map(([k,label])=>(
                      React.createElement('div', {key:k},
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, label),
                        React.createElement('input', {type:"number",value:gmStatEdit[k],placeholder:"current",onChange:e=>setGmStatEdit(p=>({...p,[k]:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"8px 10px"}})
                      )
                    ))
                  ),
                  React.createElement(Btn, {onClick:gmApplyStats,style:{width:"100%",marginTop:10,background:"rgba(61,214,140,0.1)",border:"1px solid #3dd68c",color:"#3dd68c",padding:"12px",borderRadius:6,fontSize:13,fontFamily:"monospace"}}, "⚡ APPLY TO ALL PLAYERS")
                ),
                /* Teleport all */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "🌀 TELEPORT ALL TO REGION"),
                  React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                    Object.keys(REGIONS).map(r=>(
                      React.createElement(Btn, {key:r,onClick:()=>{fbSendGmCommand('teleport',{region:r},'all');gmLog("Teleported all to "+r,"system");},style:{background:"rgba(170,68,255,0.06)",border:"1px solid #2a1a40",color:"#aa88ff",padding:"8px 6px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, r.slice(0,14))
                    ))
                  )
                )
              ),

              /* ── SPAWN TAB ── */
              gmTab==="spawn"&&React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:14}},
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "👾 SPAWN MOB"+(gameView==="combat"?" — ⚠ In Combat":"")),
                  React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                    Object.keys(MOB_TEMPLATES).slice(0,14).map(mob=>(
                      React.createElement(Btn, {key:mob,onClick:()=>{
                        if(gameView==="combat"){gLog("Can't spawn during combat!","warn");return;}
                        var t=MOB_TEMPLATES[mob];
                        setEncounter({enemies:[{...t,name:mob,hp:t.hp,maxHp:t.hp}]});
                        setGameView("combat");setCombatTurn("player");setSelectedTargetIdx(0);
                        gLog("GM spawned: "+mob,"system");notify("GM: "+mob+" spawns!","#ff8800");
                      },style:{background:"rgba(255,85,51,0.06)",border:"1px solid #2a1510",color:"#ff8855",padding:"8px 6px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, mob.slice(0,16))
                    ))
                  )
                ),
                /* NPC puppets */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "🎭 NPC PUPPETS"),
                  React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:6}},
                    npcPlayers.filter(n=>n.status==="online").slice(0,4).map(n=>(
                      React.createElement('div', {key:n.id,style:{background:"rgba(0,0,0,0.3)",border:"1px solid #1a2535",borderRadius:6,padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between"}},
                        React.createElement('div', {style:{fontSize:12,color:"#b8cfe0"}}, (CLASSES[n.cls]||{}).icon||"⚔️"," ",n.name," · Lv."+n.level),
                        React.createElement('div', {style:{display:"flex",gap:6}},
                          React.createElement(Btn, {onClick:()=>{setGmPuppet({mode:"ambush",npcId:n.id});notify("Ambush set: "+n.name,"#ff4444");gmLog("Ambush: "+n.name,"system");},style:{background:"rgba(255,68,68,0.08)",border:"1px solid #ff4444",color:"#ff4444",padding:"5px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, "Ambush"),
                          React.createElement(Btn, {onClick:()=>{setGmPuppet({mode:"escort",npcId:n.id});notify("Escort: "+n.name,"#44aaff");gmLog("Escort: "+n.name,"system");},style:{background:"rgba(68,170,255,0.07)",border:"1px solid #44aaff44",color:"#44aaff",padding:"5px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, "Escort")
                        )
                      )
                    ))
                  )
                )
              ),

              /* ── COMMS TAB ── */
              gmTab==="comms"&&React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:14}},
                /* Announce */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "📢 SERVER ANNOUNCEMENT"),
                  React.createElement('div', {style:{display:"flex",gap:6,marginBottom:8}},
                    React.createElement('input', {value:gmAnnounceForm.icon,onChange:e=>setGmAnnounceForm(p=>({...p,icon:e.target.value})),style:{...inp(),width:48,textAlign:"center",fontSize:18}}),
                    React.createElement('input', {value:gmAnnounceForm.text,placeholder:"Announcement text…",onChange:e=>setGmAnnounceForm(p=>({...p,text:e.target.value})),onKeyDown:e=>{if(e.key==="Enter")gmSendAnnounce();},style:{...inp(),flex:1,fontSize:13,padding:"10px 12px"}})
                  ),
                  React.createElement('div', {style:{display:"flex",gap:6,alignItems:"center",marginBottom:8}},
                    React.createElement('div', {style:{fontSize:10,color:"#3a5068"}}, "Color:"),
                    React.createElement('input', {type:"color",value:gmAnnounceForm.color,onChange:e=>setGmAnnounceForm(p=>({...p,color:e.target.value})),style:{width:40,height:32,border:"1px solid #1a2535",borderRadius:4,background:"#0a0c10"}})
                  ),
                  React.createElement(Btn, {onClick:gmSendAnnounce,style:{width:"100%",background:"rgba(255,215,0,0.08)",border:"1px solid #ffd700",color:"#ffd700",padding:"12px",borderRadius:6,fontSize:13,fontFamily:"monospace"}}, "📢 BROADCAST TO ALL")
                ),
                /* Whisper */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "📨 WHISPER"),
                  React.createElement('input', {value:gmWhisperForm.text,placeholder:"Private message…",onChange:e=>setGmWhisperForm(p=>({...p,text:e.target.value})),onKeyDown:e=>{if(e.key==="Enter")gmSendWhisper();},style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"10px 12px",marginBottom:8}}),
                  React.createElement('div', {style:{display:"flex",gap:6,alignItems:"center",marginBottom:8}},
                    React.createElement('div', {style:{fontSize:10,color:"#3a5068"}}, "Color:"),
                    React.createElement('input', {type:"color",value:gmWhisperForm.color,onChange:e=>setGmWhisperForm(p=>({...p,color:e.target.value})),style:{width:40,height:32,border:"1px solid #1a2535",borderRadius:4,background:"#0a0c10"}})
                  ),
                  React.createElement(Btn, {onClick:gmSendWhisper,style:{width:"100%",background:"rgba(170,136,255,0.08)",border:"1px solid #aa88ff",color:"#aa88ff",padding:"12px",borderRadius:6,fontSize:13,fontFamily:"monospace"}}, "📨 SEND WHISPER TO ALL")
                ),
                /* Bounties */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "🎯 BOUNTIES"),
                  React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:6,marginBottom:8}},
                    React.createElement('input', {value:gmBountyForm.name,placeholder:"Bounty name",onChange:e=>setGmBountyForm(p=>({...p,name:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"9px 12px"}}),
                    React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:3}}, "Goal"),
                        React.createElement('input', {type:"number",value:gmBountyForm.goal,onChange:e=>setGmBountyForm(p=>({...p,goal:+e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}})
                      ),
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:3}}, "Reward (gold)"),
                        React.createElement('input', {type:"number",value:gmBountyForm.rewardGold,onChange:e=>setGmBountyForm(p=>({...p,rewardGold:+e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}})
                      )
                    ),
                    React.createElement(Btn, {onClick:gmCreateBounty,style:{background:"rgba(255,215,0,0.08)",border:"1px solid #ffd700",color:"#ffd700",padding:"10px",borderRadius:6,fontSize:12,fontFamily:"monospace"}}, "🎯 POST BOUNTY")
                  ),
                  gmBounties.length>0&&React.createElement('div', null,
                    React.createElement('div', {style:{fontSize:9,color:"#3a5068",letterSpacing:2,marginBottom:6}}, "ACTIVE BOUNTIES"),
                    gmBounties.map(b=>(
                      React.createElement('div', {key:b.id,style:{background:"rgba(0,0,0,0.3)",border:"1px solid "+(b.done?"#ffd700":"#1a2535"),borderRadius:4,padding:"8px 10px",marginBottom:5,display:"flex",justifyContent:"space-between",alignItems:"center"}},
                        React.createElement('div', null,
                          React.createElement('div', {style:{fontSize:12,color:b.done?"#ffd700":"#b8cfe0"}}, b.name),
                          React.createElement('div', {style:{fontSize:10,color:"#3a5068"}}, (b.progress||0)+"/"+b.goal+" · +"+b.rewardGold+"g")
                        ),
                        b.done
                          ?React.createElement(Btn, {onClick:()=>claimBounty(b),style:{background:"rgba(255,215,0,0.1)",border:"1px solid #ffd700",color:"#ffd700",padding:"4px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, "Claim")
                          :React.createElement(Btn, {onClick:()=>setGmBounties(p=>p.filter(x=>x.id!==b.id)),style:{background:"none",border:"1px solid #3a2020",color:"#ff4444",padding:"4px 10px",borderRadius:4,fontSize:10,fontFamily:"monospace"}}, "✕")
                      )
                    ))
                  )
                )
              ),

              /* ── SHOP TAB ── */
              gmTab==="shop"&&React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:14}},
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "🛍️ SHOP MODS"),
                  React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:6,marginBottom:8}},
                    React.createElement('div', null,
                      React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Item to add"),
                      React.createElement('select', {value:gmShopForm.item,onChange:e=>setGmShopForm(p=>({...p,item:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"9px 10px"}},
                        Object.keys(ITEMS).map(i=>React.createElement('option', {key:i}, i))
                      )
                    ),
                    React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Shop"),
                        React.createElement('select', {value:gmShopForm.shop,onChange:e=>setGmShopForm(p=>({...p,shop:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}},
                          React.createElement('option', {value:"all"}, "All Shops"),
                          Object.keys(REGIONS).map(r=>React.createElement('option', {key:r}, r))
                        )
                      ),
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Duration"),
                        React.createElement('select', {value:gmShopForm.duration,onChange:e=>setGmShopForm(p=>({...p,duration:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}},
                          React.createElement('option', {value:"permanent"}, "Permanent"),
                          React.createElement('option', {value:"5min"}, "5 min"),
                          React.createElement('option', {value:"15min"}, "15 min"),
                          React.createElement('option', {value:"1hr"}, "1 hour")
                        )
                      )
                    ),
                    React.createElement(Btn, {onClick:gmAddShopMod,style:{background:"rgba(255,215,0,0.08)",border:"1px solid #ffd700",color:"#ffd700",padding:"12px",borderRadius:6,fontSize:13,fontFamily:"monospace"}}, "🛍️ ADD TO SHOP")
                  ),
                  gmShopMods.length>0&&React.createElement('div', null,
                    React.createElement('div', {style:{fontSize:9,color:"#3a5068",letterSpacing:2,marginBottom:6}}, "ACTIVE MODS"),
                    gmShopMods.map(m=>(
                      React.createElement('div', {key:m.id,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:"rgba(0,0,0,0.3)",border:"1px solid #1a2535",borderRadius:4,marginBottom:4}},
                        React.createElement('span', {style:{fontSize:12,color:"#b8cfe0"}}, m.item+" → "+(m.shop==="all"?"All Shops":m.shop)),
                        React.createElement(Btn, {onClick:()=>setGmShopMods(p=>p.filter(x=>x.id!==m.id)),style:{background:"none",border:"1px solid #3a2020",color:"#ff4444",padding:"3px 8px",borderRadius:3,fontSize:11,fontFamily:"monospace"}}, "✕")
                      )
                    ))
                  )
                )
              ),

              /* ── CREATE TAB ── */
              gmTab==="create"&&React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:14}},
                /* Custom item */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "✦ CREATE CUSTOM ITEM"),
                  React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:8}},
                    React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Name"),
                        React.createElement('input', {value:gmCustomItemForm.name,placeholder:"Item name",onChange:e=>setGmCustomItemForm(p=>({...p,name:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"9px 10px"}})
                      ),
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Icon (emoji)"),
                        React.createElement('input', {value:gmCustomItemForm.icon,onChange:e=>setGmCustomItemForm(p=>({...p,icon:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:18,textAlign:"center"}})
                      )
                    ),
                    React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Type"),
                        React.createElement('select', {value:gmCustomItemForm.type,onChange:e=>setGmCustomItemForm(p=>({...p,type:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}},
                          React.createElement('option', {value:"weapon"}, "Weapon"),
                          React.createElement('option', {value:"armor"}, "Armor"),
                          React.createElement('option', {value:"consumable"}, "Consumable")
                        )
                      ),
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Effect"),
                        React.createElement('select', {value:gmCustomItemForm.effect,onChange:e=>setGmCustomItemForm(p=>({...p,effect:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}},
                          React.createElement('option', {value:"atk"}, "+ATK"),
                          React.createElement('option', {value:"mag"}, "+MAG"),
                          React.createElement('option', {value:"hp"}, "+HP"),
                          React.createElement('option', {value:"spd"}, "+SPD"),
                          React.createElement('option', {value:"heal"}, "Heal"),
                          React.createElement('option', {value:"mana"}, "Mana")
                        )
                      )
                    ),
                    React.createElement('div', null,
                      React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Value"),
                      React.createElement('input', {type:"number",value:gmCustomItemForm.value,onChange:e=>setGmCustomItemForm(p=>({...p,value:+e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"9px 10px"}})
                    ),
                    React.createElement('div', null,
                      React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Description"),
                      React.createElement('input', {value:gmCustomItemForm.desc,placeholder:"Item description",onChange:e=>setGmCustomItemForm(p=>({...p,desc:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"9px 10px"}})
                    ),
                    React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                      React.createElement(Btn, {onClick:gmCreateCustomItem,style:{background:"rgba(68,170,255,0.08)",border:"1px solid #44aaff",color:"#44aaff",padding:"12px",borderRadius:6,fontSize:12,fontFamily:"monospace"}}, "⚔️ CREATE"),
                      React.createElement(Btn, {onClick:()=>{if(!gmCustomItemForm.name)return;fbSendGmCommand('give_item',{item:gmCustomItemForm.name},'all');},style:{background:"rgba(61,214,140,0.07)",border:"1px solid #1a3525",color:"#3dd68c",padding:"12px",borderRadius:6,fontSize:12,fontFamily:"monospace"}}, "Gift All")
                    )
                  )
                ),
                /* Custom event */
                React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:10,color:"#3a5068",letterSpacing:2,marginBottom:8}}, "🌟 CREATE CUSTOM EVENT"),
                  React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:8}},
                    React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}},
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Name"),
                        React.createElement('input', {value:gmCustomEventForm.name,placeholder:"Event name",onChange:e=>setGmCustomEventForm(p=>({...p,name:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"9px 10px"}})
                      ),
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Icon"),
                        React.createElement('input', {value:gmCustomEventForm.icon,onChange:e=>setGmCustomEventForm(p=>({...p,icon:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:18,textAlign:"center"}})
                      )
                    ),
                    React.createElement('input', {value:gmCustomEventForm.desc,placeholder:"Event description",onChange:e=>setGmCustomEventForm(p=>({...p,desc:e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box",fontSize:13,padding:"9px 10px"}}),
                    React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}},
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Duration (s)"),
                        React.createElement('input', {type:"number",value:gmCustomEventForm.duration,onChange:e=>setGmCustomEventForm(p=>({...p,duration:+e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}})
                      ),
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "XP Mult"),
                        React.createElement('input', {type:"number",value:gmCustomEventForm.xpMult,min:1,max:10,onChange:e=>setGmCustomEventForm(p=>({...p,xpMult:+e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}})
                      ),
                      React.createElement('div', null,
                        React.createElement('div', {style:{fontSize:9,color:"#3a5068",marginBottom:4}}, "Gold Mult"),
                        React.createElement('input', {type:"number",value:gmCustomEventForm.goldMult,min:1,max:10,onChange:e=>setGmCustomEventForm(p=>({...p,goldMult:+e.target.value})),style:{...inp(),width:"100%",boxSizing:"border-box"}})
                      )
                    ),
                    React.createElement('div', {style:{display:"flex",gap:6,alignItems:"center"}},
                      React.createElement('div', {style:{fontSize:9,color:"#3a5068"}},"Color:"),
                      React.createElement('input', {type:"color",value:gmCustomEventForm.color,onChange:e=>setGmCustomEventForm(p=>({...p,color:e.target.value})),style:{width:40,height:34,border:"1px solid #1a2535",borderRadius:4,background:"#0a0c10"}})
                    ),
                    React.createElement(Btn, {onClick:()=>{gmCreateCustomEvent();gmLog("Custom event launched","system");},style:{width:"100%",background:"rgba(61,214,140,0.08)",border:"1px solid #3dd68c",color:"#3dd68c",padding:"12px",borderRadius:6,fontSize:13,fontFamily:"monospace"}}, "🌟 CREATE & LAUNCH EVENT")
                  )
                ),
                /* Custom items list */
                Object.keys(gmCustomItems).length>0&&React.createElement('div', null,
                  React.createElement('div', {style:{fontSize:9,color:"#3a5068",letterSpacing:2,marginBottom:6}}, "CUSTOM ITEMS"),
                  Object.entries(gmCustomItems).map(([name,item])=>(
                    React.createElement('div', {key:name,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:"rgba(0,0,0,0.3)",border:"1px solid #1a2535",borderRadius:4,marginBottom:4}},
                      React.createElement('span', {style:{fontSize:12,color:"#b8cfe0"}}, item.icon+" "+name),
                      React.createElement(Btn, {onClick:()=>fbSendGmCommand('give_item',{item:name},'all'),style:{background:"rgba(68,170,255,0.07)",border:"1px solid #1a2a40",color:"#44aaff",padding:"4px 10px",borderRadius:3,fontSize:11,fontFamily:"monospace"}}, "Gift All")
                    )
                  ))
                )
              )

            ),
            /* GM log */
            React.createElement('div', {ref:gmLogRef,style:{height:90,overflowY:"auto",borderTop:"1px solid #1a2535",padding:"6px 12px",background:"rgba(0,0,0,0.6)",flexShrink:0}},
              gmLogs.map((entry,i)=>{
                var colors={system:"#3dd68c",warn:"#ffaa00",info:"#3a5068"};
                return React.createElement('div', {key:i,style:{fontSize:10,color:colors[entry.type]||"#3a5068",padding:"1px 0",lineHeight:1.4,fontFamily:"monospace"}}, entry.t+" "+entry.msg);
              })
            )
          )
        )
      )
    )
  );
}


    var root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(GMGame, null ));
