const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Deal Scout — Peter Kolat</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
:root{
  --gold:#F5A623;--gold2:#E8961A;--gold-glow:#F5A62340;
  --bg:#000000;--bg1:#0a0a0a;--bg2:#111111;--bg3:#1a1a1a;--bg4:#222222;--bg5:#2a2a2a;
  --border:#2a2a2a;--border2:#333333;--text:#ffffff;--text2:#ebebeb;--text3:#a0a0a0;--text4:#606060;
  --blue:#0A84FF;--green:#30D158;--red:#FF453A;--amber:#FFD60A;--purple:#BF5AF2;
  --radius:14px;--radius-sm:10px;--radius-xs:7px;
}
html,body{height:100%;overflow:hidden}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);display:flex;flex-direction:column}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#333;border-radius:2px}

/* LOGIN */
#login-screen{position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;z-index:9999;flex-direction:column}
.login-glow{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,#F5A62308 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.login-card{position:relative;background:rgba(17,17,17,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:48px 44px;width:100%;max-width:400px;backdrop-filter:blur(40px);box-shadow:0 32px 80px rgba(0,0,0,0.8)}
.login-mark{width:64px;height:64px;border-radius:18px;background:linear-gradient(145deg,#F5A623,#E8961A);display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 28px;box-shadow:0 8px 24px rgba(245,166,35,0.35)}
.login-h{font-size:26px;font-weight:700;color:var(--text);text-align:center;letter-spacing:-0.5px;margin-bottom:6px}
.login-sub{font-size:13px;color:var(--text4);text-align:center;margin-bottom:32px}
.login-label{display:block;font-size:11px;font-weight:600;color:var(--text3);letter-spacing:0.8px;text-transform:uppercase;margin-bottom:7px}
.login-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:13px 16px;font-size:15px;color:var(--text);font-family:inherit;margin-bottom:14px;transition:all 0.2s;outline:none}
.login-input:focus{border-color:rgba(245,166,35,0.4);background:rgba(255,255,255,0.06)}
.login-btn{width:100%;background:linear-gradient(145deg,#F5A623,#E8961A);border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:600;color:#000;cursor:pointer;margin-top:4px;transition:all 0.2s;font-family:inherit}
.login-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(245,166,35,0.35)}
.login-err{color:#FF453A;font-size:12px;text-align:center;margin-top:12px;min-height:16px;font-weight:500}
.login-footer{position:absolute;bottom:28px;font-size:11px;color:var(--text4)}

/* APP */
#app{display:none;flex-direction:column;height:100vh}
#app.on{display:flex}

/* HEADER */
.hdr{background:rgba(0,0,0,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.06);padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:56px;flex-shrink:0;z-index:50}
.hdr-logo{display:flex;align-items:center;gap:12px}
.app-icon{width:30px;height:30px;border-radius:8px;background:linear-gradient(145deg,#F5A623,#C87D10);display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 8px rgba(245,166,35,0.3)}
.app-name{font-size:14px;font-weight:700;color:var(--text);letter-spacing:-0.2px}
.app-sub{font-size:9px;color:var(--text4);letter-spacing:0.5px}
.hdr-stats{display:flex;gap:16px}
.hstat{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text4)}
.hstat-dot{width:6px;height:6px;border-radius:50%}
.hdr-right{display:flex;gap:8px;align-items:center}

/* BUTTONS */
.btn{border:none;border-radius:var(--radius-xs);cursor:pointer;font-family:inherit;font-weight:600;transition:all 0.18s;display:inline-flex;align-items:center;gap:5px}
.btn:active{transform:scale(0.97)}
.btn-gold{background:linear-gradient(145deg,#F5A623,#E8961A);color:#000;padding:8px 18px;font-size:12px;box-shadow:0 4px 14px rgba(245,166,35,0.25)}
.btn-gold:hover{box-shadow:0 6px 20px rgba(245,166,35,0.35);transform:translateY(-1px)}
.btn-sec{background:rgba(255,255,255,0.08);color:var(--text2);border:1px solid rgba(255,255,255,0.08);padding:8px 16px;font-size:12px}
.btn-sec:hover{background:rgba(255,255,255,0.12)}
.btn-ghost{background:transparent;color:var(--text3);padding:6px 12px;font-size:11px;border:1px solid rgba(255,255,255,0.06)}
.btn-ghost:hover{background:rgba(255,255,255,0.05);color:var(--text)}
.btn-xs{padding:4px 10px;font-size:10px;border-radius:6px}
.btn-icon{width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;transition:all 0.15s}
.btn-icon:hover{background:rgba(255,255,255,0.1)}

/* NAV */
.nav{background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.05);display:flex;padding:0 24px;gap:2px;flex-shrink:0}
.ntab{background:transparent;border:none;border-bottom:2px solid transparent;padding:13px 16px;font-size:12px;font-weight:500;color:var(--text4);cursor:pointer;font-family:inherit;transition:all 0.2s;letter-spacing:0.3px;white-space:nowrap}
.ntab:hover{color:var(--text2)}
.ntab.on{color:var(--gold);border-bottom-color:var(--gold)}

/* MAIN */
.main{flex:1;overflow:hidden;display:flex;min-height:0}
.page{display:none;flex:1;overflow-y:auto;padding:24px;flex-direction:column}
.page.on{display:flex}
.split{display:none;flex:1;overflow:hidden}
.split.on{display:flex}

/* CARDS */
.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius);padding:18px}
.card-title{font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.scard{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius);padding:20px;position:relative;overflow:hidden;transition:all 0.2s;cursor:default}
.scard:hover{background:rgba(255,255,255,0.05);transform:translateY(-2px)}
.scard-icon{font-size:20px;margin-bottom:10px}
.scard-val{font-size:32px;font-weight:800;color:var(--text);letter-spacing:-1px;line-height:1}
.scard-lbl{font-size:12px;font-weight:500;color:var(--text3);margin-top:4px}
.scard-sub{font-size:10px;color:var(--text4);margin-top:2px}
.scard-accent{position:absolute;bottom:0;left:0;right:0;height:2px;border-radius:0 0 var(--radius) var(--radius)}

/* KANBAN */
.kanban{display:flex;gap:12px;overflow-x:auto;padding-bottom:12px;flex:1;align-items:flex-start}
.kcol{min-width:195px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius);padding:14px;flex-shrink:0}
.kcol-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.kcol-lbl{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
.kcol-cnt{font-size:9px;border-radius:20px;padding:2px 8px;font-weight:700}
.kcard{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-sm);padding:12px;margin-bottom:8px;cursor:pointer;transition:all 0.2s}
.kcard:hover{background:rgba(255,255,255,0.07);transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,0.3)}
.kcard-name{font-size:12px;font-weight:600;color:var(--text);margin-bottom:3px}
.kcard-meta{font-size:9px;color:var(--text4);margin-bottom:7px}
.kcard-scores{display:flex;justify-content:space-between}

/* LEADS */
.leads-sidebar{width:310px;border-right:1px solid rgba(255,255,255,0.05);display:flex;flex-direction:column;flex-shrink:0;background:rgba(0,0,0,0.3)}
.search-wrap{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.05)}
.search-in{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:9px 14px;font-size:13px;color:var(--text);font-family:inherit;outline:none}
.search-in:focus{border-color:rgba(245,166,35,0.3)}
.search-in::placeholder{color:var(--text4)}
.filter-wrap{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.04);display:flex;gap:4px;flex-wrap:wrap}
.fbtn{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.06);border-radius:20px;color:var(--text4);padding:3px 9px;font-size:9px;cursor:pointer;font-family:inherit;transition:all 0.15s;font-weight:500}
.fbtn:hover{background:rgba(255,255,255,0.08);color:var(--text2)}
.fbtn.on{background:rgba(245,166,35,0.12);color:var(--gold);border-color:rgba(245,166,35,0.25)}
.leads-list{overflow-y:auto;flex:1}
.litem{padding:13px 14px;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer;transition:all 0.15s;position:relative}
.litem:hover{background:rgba(255,255,255,0.03)}
.litem.on{background:rgba(245,166,35,0.05);border-left:2px solid var(--gold)}
.litem-name{font-size:12px;font-weight:600;color:var(--text);margin-bottom:2px;padding-right:36px}
.litem-meta{font-size:10px;color:var(--text4);margin-bottom:5px}
.litem-score{position:absolute;top:13px;right:12px;font-size:13px;font-weight:800}
.litem-badges{display:flex;gap:4px;flex-wrap:wrap;align-items:center}
.badge{font-size:8px;border-radius:20px;padding:2px 7px;font-weight:700}

/* DETAIL */
.detail{flex:1;display:flex;flex-direction:column;overflow:hidden}
.d-head{padding:18px 22px;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.4);backdrop-filter:blur(20px);flex-shrink:0}
.d-name{font-size:19px;font-weight:700;color:var(--text);letter-spacing:-0.3px;margin-bottom:3px}
.d-sub{font-size:11px;color:var(--text4);margin-bottom:8px}
.d-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.3);flex-shrink:0;padding:0 22px}
.dtab{background:transparent;border:none;border-bottom:2px solid transparent;padding:10px 13px;font-size:11px;font-weight:500;color:var(--text4);cursor:pointer;font-family:inherit;transition:all 0.15s}
.dtab:hover{color:var(--text2)}
.dtab.on{color:var(--gold);border-bottom-color:var(--gold)}
.d-body{flex:1;overflow-y:auto;padding:18px 22px}
.no-sel{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text4);gap:10px}
.no-sel-icon{font-size:36px;opacity:0.2}

/* SCORES */
.scores-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.sbox{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-sm);padding:12px;text-align:center;transition:all 0.2s}
.sbox:hover{background:rgba(255,255,255,0.05)}
.sbox-val{font-size:22px;font-weight:800;letter-spacing:-0.5px;line-height:1}
.sbox-lbl{font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:1px;margin-top:4px}

/* FACT TABLE */
.fact-table{border-radius:var(--radius-sm);overflow:hidden;border:1px solid rgba(255,255,255,0.06)}
.fact-row{display:flex;justify-content:space-between;align-items:center;padding:9px 13px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:11px}
.fact-row:last-child{border-bottom:none}
.fact-row:nth-child(even){background:rgba(255,255,255,0.015)}
.fact-k{color:var(--text4);font-weight:500}
.fact-v{color:var(--text);font-weight:600;text-align:right;max-width:200px}

/* MOTIVATION */
.mot-wrap{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-sm);padding:14px;margin-bottom:12px}
.mot-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.mot-bar-bg{height:4px;background:rgba(255,255,255,0.08);border-radius:2px;margin-bottom:10px}
.mot-bar{height:4px;border-radius:2px;transition:width 0.8s}
.mot-r{font-size:11px;color:var(--text3);padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04)}
.mot-r:last-child{border-bottom:none}

/* CONTACT LINKS */
.clink{display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:5px 11px;font-size:10px;color:var(--text2);text-decoration:none;margin:3px;transition:all 0.15s;font-weight:500}
.clink:hover{background:rgba(255,255,255,0.09);color:var(--text)}

/* ROLAND */
.roland-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden}
.r-bar{padding:13px 20px;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.5);display:flex;align-items:center;gap:12px;flex-shrink:0}
.r-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(145deg,#F5A623,#C87D10);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 4px 14px rgba(245,166,35,0.25)}
.r-name{font-size:14px;font-weight:700;color:var(--text);letter-spacing:-0.2px}
.r-tag{font-size:10px;color:var(--text4)}
.r-chip{margin-left:auto;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:5px 11px;display:none}
.r-chip.on{display:block}
.r-chip-tag{font-size:9px;color:#818cf8;font-weight:700;letter-spacing:0.8px;text-transform:uppercase}
.r-chip-val{font-size:11px;color:#a5b4fc;font-weight:600}
.r-sel-bar{padding:9px 20px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(0,0,0,0.3);display:flex;gap:10px;align-items:center;flex-shrink:0}
.r-doc-bar{padding:8px 20px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(0,0,0,0.2);display:flex;gap:7px;align-items:center;flex-shrink:0}
.r-msgs{flex:1;overflow-y:auto;padding:18px 20px;display:flex;flex-direction:column;gap:12px}
.msg{display:flex;gap:8px;align-items:flex-start}
.msg.user{flex-direction:row-reverse}
.msg-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(145deg,#F5A623,#C87D10);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;margin-top:2px}
.msg-bub{max-width:78%;padding:11px 14px;border-radius:14px;font-size:12px;line-height:1.75;white-space:pre-wrap}
.msg-bub.ai{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.07);border-radius:4px 14px 14px 14px;color:var(--text2)}
.msg-bub.user{background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.15);border-radius:14px 4px 14px 14px;color:var(--text)}
.r-inp-wrap{padding:12px 20px;border-top:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.4);display:flex;gap:9px;flex-shrink:0}
.r-textarea{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:var(--text);padding:11px 14px;font-size:12px;font-family:inherit;resize:none;line-height:1.5;transition:all 0.2s;outline:none}
.r-textarea:focus{border-color:rgba(245,166,35,0.3)}
.r-textarea::placeholder{color:var(--text4)}
.doc-panel{margin:0 20px;background:rgba(255,255,255,0.03);border:1px solid rgba(245,166,35,0.2);border-radius:var(--radius);overflow:hidden;flex-shrink:0;display:none}
.doc-panel.on{display:block}
.doc-head{padding:9px 14px;background:rgba(245,166,35,0.06);border-bottom:1px solid rgba(245,166,35,0.1);display:flex;justify-content:space-between;align-items:center}
.doc-body{padding:12px 14px;max-height:190px;overflow-y:auto;font-size:11px;color:var(--text3);line-height:1.75;white-space:pre-wrap;font-family:'SF Mono','Fira Code',monospace}
.typing-dot{width:6px;height:6px;border-radius:50%;background:var(--gold);display:inline-block}
.typing-dot:nth-child(1){animation:td 1.2s 0s infinite}
.typing-dot:nth-child(2){animation:td 1.2s 0.2s infinite}
.typing-dot:nth-child(3){animation:td 1.2s 0.4s infinite}
@keyframes td{0%,100%{transform:translateY(0);opacity:0.7}50%{transform:translateY(-4px);opacity:1}}

/* AGENT */
.agent-log{background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius);padding:18px;min-height:240px;max-height:420px;overflow-y:auto;font-family:'SF Mono','Fira Code','Courier New',monospace;font-size:11px}
.log-line{margin-bottom:4px;line-height:1.6;display:flex;gap:8px}
.log-num{color:var(--text4);flex-shrink:0}
.pulse{animation:pulse 1.8s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}

/* FORMS */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.ff{display:flex;flex-direction:column;gap:4px}
.ff.full{grid-column:1/-1}
.fl{font-size:9px;font-weight:600;color:var(--text4);letter-spacing:1px;text-transform:uppercase}
.fi{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:var(--text);padding:9px 13px;font-size:12px;font-family:inherit;transition:all 0.2s;width:100%;outline:none}
.fi:focus{border-color:rgba(245,166,35,0.35);background:rgba(255,255,255,0.07)}
.fi::placeholder{color:var(--text4)}
.check-row{display:flex;gap:16px;flex-wrap:wrap;margin:10px 0}
.check-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text2);cursor:pointer;font-weight:500}
.check-item input{accent-color:var(--gold);width:14px;height:14px}
.calc-prev{background:rgba(48,209,88,0.06);border:1px solid rgba(48,209,88,0.15);border-radius:10px;padding:11px 13px;font-size:12px;color:#30D158;margin:8px 0;line-height:1.6;display:none}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;z-index:200;padding:20px}
.overlay.on{display:flex}
.modal{background:#111111;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:26px;width:100%;max-width:560px;max-height:88vh;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,0.9)}
.modal-title{font-size:17px;font-weight:700;color:var(--text);letter-spacing:-0.3px;margin-bottom:18px}

/* SETUP */
.setup-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px}
.setup-row:last-child{border-bottom:none}
.sdot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px}

/* UTILS */
.mb12{margin-bottom:12px}.mb10{margin-bottom:10px}.mb8{margin-bottom:8px}
.green-pill{background:rgba(48,209,88,0.06);border:1px solid rgba(48,209,88,0.15);border-radius:8px;padding:8px 12px;font-size:11px;color:#30D158;margin-top:8px}
.red-pill{background:rgba(255,69,58,0.06);border:1px solid rgba(255,69,58,0.15);border-radius:8px;padding:8px 12px;font-size:11px;color:#FF453A;margin-top:6px}
.note-block{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:11px 13px;font-size:11px;color:var(--text3);line-height:1.7;white-space:pre-wrap;max-height:160px;overflow-y:auto;margin-bottom:10px}
.offer-block{background:rgba(255,214,10,0.06);border:1px solid rgba(255,214,10,0.15);border-radius:10px;padding:11px 13px;margin-bottom:11px}
.fade-in{animation:fi 0.22s ease}
@keyframes fi{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}
select.fi{width:100%}
</style>
</head>
<body>

<div id="login-screen">
  <div class="login-glow"></div>
  <div class="login-card fade-in">
    <div class="login-mark">⚡</div>
    <div class="login-h">Deal Scout</div>
    <div class="login-sub">Peter Kolat · Acquisition Intelligence</div>
    <label class="login-label">Username</label>
    <input class="login-input" id="lu" type="text" placeholder="Enter username" autocomplete="off">
    <label class="login-label">Password</label>
    <input class="login-input" id="lp" type="password" placeholder="Enter password" autocomplete="off">
    <button class="login-btn" onclick="doLogin()">Sign In →</button>
    <div class="login-err" id="lerr"></div>
  </div>
  <div class="login-footer">deals.realestateblackbook.workers.dev</div>
</div>

<div id="app">
  <div class="hdr">
    <div class="hdr-logo">
      <div class="app-icon">⚡</div>
      <div><div class="app-name">Deal Scout</div><div class="app-sub">PETER KOLAT · ACQUISITION INTELLIGENCE</div></div>
    </div>
    <div class="hdr-stats">
      <div class="hstat"><div class="hstat-dot" style="background:#30D158"></div><span id="ts-leads">0 leads</span></div>
      <div class="hstat"><div class="hstat-dot" style="background:#FF453A"></div><span id="ts-hot">0 hot</span></div>
      <div class="hstat"><div class="hstat-dot" style="background:#F5A623"></div><span id="ts-bud">0 in budget</span></div>
    </div>
    <div class="hdr-right">
      <button class="btn btn-sec" onclick="showModal()">+ Add Lead</button>
      <button class="btn btn-gold" id="agent-btn" onclick="runAgent()">⚡ Run Agent</button>
      <div class="btn-icon" onclick="doLogout()" title="Sign out" style="font-size:12px">↪</div>
    </div>
  </div>

  <div class="nav">
    <button class="ntab on" data-t="pipeline" onclick="goTab('pipeline')">◈ Pipeline</button>
    <button class="ntab" data-t="leads" onclick="goTab('leads')">◎ Leads</button>
    <button class="ntab" data-t="roland" onclick="goTab('roland')">◉ Ask Roland</button>
    <button class="ntab" data-t="agent" onclick="goTab('agent')">◌ Agent</button>
    <button class="ntab" data-t="setup" onclick="goTab('setup')">◦ Setup</button>
  </div>

  <div class="main">
    <div class="page on" id="p-pipeline">
      <div class="stats" id="stat-grid"></div>
      <div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">PIPELINE BY STAGE</div>
      <div class="kanban" id="kanban"></div>
    </div>

    <div class="split" id="p-leads">
      <div class="leads-sidebar">
        <div class="search-wrap"><input class="search-in" id="search-in" placeholder="🔍  Search leads..." oninput="renderList()"></div>
        <div class="filter-wrap" id="filter-wrap"></div>
        <div class="leads-list" id="leads-list"></div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        <div class="no-sel" id="no-sel"><div class="no-sel-icon">◎</div><div style="font-size:13px;font-weight:500">Select a lead to view details</div><div style="font-size:11px;color:var(--text4)">or click + Add Lead to get started</div></div>
        <div class="detail" id="detail" style="display:none">
          <div class="d-head">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div style="flex:1"><div class="d-name" id="d-name"></div><div class="d-sub" id="d-sub"></div><div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center" id="d-badges"></div></div>
              <div class="btn-icon" onclick="closeDetail()">✕</div>
            </div>
          </div>
          <div class="d-tabs">
            <button class="dtab on" data-d="overview" onclick="goDTab('overview')">Overview</button>
            <button class="dtab" data-d="contacts" onclick="goDTab('contacts')">Contacts</button>
            <button class="dtab" data-d="offers" onclick="goDTab('offers')">Offers & Notes</button>
          </div>
          <div class="d-body fade-in" id="d-body"></div>
        </div>
      </div>
    </div>

    <div class="split" id="p-roland">
      <div class="roland-wrap">
        <div class="r-bar">
          <div class="r-av">🎯</div>
          <div><div class="r-name">Roland Frasier</div><div class="r-tag">Acquisition Coach · EPIC Framework · Zero Down Deals</div></div>
          <div class="r-chip" id="r-chip"><div class="r-chip-tag">Active Deal</div><div class="r-chip-val" id="r-chip-name"></div></div>
        </div>
        <div class="r-sel-bar">
          <span style="font-size:11px;color:var(--text4);white-space:nowrap">Context:</span>
          <select class="fi" id="r-sel" onchange="setRDeal(this.value)" style="max-width:280px;padding:6px 10px;font-size:11px">
            <option value="">— No deal selected —</option>
          </select>
          <span style="font-size:10px;color:var(--text4)">Roland coaches to your specific deal stage</span>
        </div>
        <div class="r-doc-bar">
          <span style="font-size:10px;color:var(--text4)">Generate:</span>
          <button class="btn btn-ghost btn-xs" onclick="genDoc('loi')">📄 LOI</button>
          <button class="btn btn-ghost btn-xs" onclick="genDoc('dd')">✅ Due Diligence</button>
          <button class="btn btn-ghost btn-xs" onclick="genDoc('script')">🎤 Seller Script</button>
          <span id="gen-st" style="font-size:11px;color:var(--gold);margin-left:6px"></span>
        </div>
        <div class="doc-panel" id="doc-panel">
          <div class="doc-head">
            <span style="font-size:11px;font-weight:600;color:var(--gold)" id="doc-title"></span>
            <div style="display:flex;gap:6px">
              <button class="btn btn-ghost btn-xs" id="copy-btn" onclick="copyDoc()">📋 Copy</button>
              <div class="btn-icon" onclick="document.getElementById('doc-panel').classList.remove('on')" style="width:22px;height:22px;font-size:11px">✕</div>
            </div>
          </div>
          <div class="doc-body" id="doc-body"></div>
        </div>
        <div class="r-msgs" id="r-msgs"></div>
        <div class="r-inp-wrap">
          <textarea class="r-textarea" id="r-input" rows="2" placeholder="Ask Roland anything... 'How do I approach this seller?' · 'Structure this deal' · 'What should I offer?'" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
          <button class="btn btn-gold" onclick="sendMsg()" style="align-self:flex-end;padding:11px 18px">Send</button>
        </div>
      </div>
    </div>

    <div class="page" id="p-agent">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <div><div style="font-size:18px;font-weight:700;color:var(--text);letter-spacing:-0.3px">Sourcing Agent</div><div style="font-size:12px;color:var(--text4);margin-top:2px">Off-market discovery · Sendr.io + Google + Social signals</div></div>
        <button class="btn btn-gold" id="agent-run-btn" onclick="runAgent()">⚡ Run Agent</button>
      </div>
      <div class="agent-log" id="agent-log"><div class="log-line"><span class="log-num">[--]</span><span style="color:var(--text4)">No runs yet. Click "Run Agent" to begin sourcing.</span></div></div>
      <div id="agent-done" style="display:none;margin-top:12px"><div class="green-pill">✅ Run complete — add your Sendr.io key in Setup → Environment Variables to get real leads flowing.</div></div>
    </div>

    <div class="page" id="p-setup" style="max-width:680px">
      <div style="font-size:19px;font-weight:700;color:var(--text);letter-spacing:-0.4px;margin-bottom:4px">Setup & Configuration</div>
      <div style="font-size:12px;color:var(--text4);margin-bottom:22px">API keys are stored securely in Cloudflare Environment Variables — never in the code.</div>
      <div class="card mb12"><div class="card-title">🔑 Environment Variables (Cloudflare)</div><div id="s-keys"></div></div>
      <div class="card mb12"><div class="card-title">◈ System Status</div><div id="s-status"></div></div>
      <div class="card"><div class="card-title">🎯 Acquisition Criteria</div><div id="s-criteria"></div></div>
    </div>
  </div>
</div>

<div class="overlay" id="modal" onclick="if(event.target===this)hideModal()">
  <div class="modal fade-in">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
      <div class="modal-title">Add New Lead</div>
      <div class="btn-icon" onclick="hideModal()">✕</div>
    </div>
    <div class="form-grid">
      <div class="ff full"><label class="fl">Company Name *</label><input class="fi" id="f-name" placeholder="e.g. Limitless Life Coaching Group"></div>
      <div class="ff"><label class="fl">Founder Name</label><input class="fi" id="f-founder" placeholder="Full name"></div>
      <div class="ff"><label class="fl">Founder Age</label><input class="fi" id="f-age" type="number" placeholder="e.g. 48"></div>
      <div class="ff"><label class="fl">Location</label><input class="fi" id="f-loc" placeholder="City, State"></div>
      <div class="ff"><label class="fl">Industry</label><input class="fi" id="f-ind" placeholder="e.g. Executive Coaching"></div>
      <div class="ff"><label class="fl">Employees</label><input class="fi" id="f-emp" type="number" placeholder="e.g. 12"></div>
      <div class="ff"><label class="fl">Annual Revenue ($)</label><input class="fi" id="f-rev" type="number" placeholder="e.g. 1800000" oninput="calcPrev()"></div>
      <div class="ff"><label class="fl">EBITDA ($)</label><input class="fi" id="f-ebitda" type="number" placeholder="e.g. 380000" oninput="calcPrev()"></div>
      <div class="ff"><label class="fl">Asking Price ($)</label><input class="fi" id="f-ask" type="number" placeholder="Leave blank if unknown" oninput="calcPrev()"></div>
      <div class="ff"><label class="fl">Source</label><input class="fi" id="f-src" placeholder="e.g. LinkedIn, Facebook Group"></div>
      <div class="ff"><label class="fl">Founder Email</label><input class="fi" id="f-email" type="email"></div>
      <div class="ff"><label class="fl">Founder Phone</label><input class="fi" id="f-phone" placeholder="(555) 000-0000"></div>
      <div class="ff"><label class="fl">LinkedIn URL</label><input class="fi" id="f-li" placeholder="https://linkedin.com/in/..."></div>
      <div class="ff"><label class="fl">Listing URL</label><input class="fi" id="f-url" placeholder="https://..."></div>
      <div class="ff"><label class="fl">Broker Name</label><input class="fi" id="f-bn" placeholder="Leave blank if no broker"></div>
      <div class="ff"><label class="fl">Broker Contact</label><input class="fi" id="f-bc" placeholder="email or phone"></div>
      <div class="ff full"><label class="fl">Source Notes</label><textarea class="fi" id="f-notes" rows="2" placeholder="How did you find this? What stood out?"></textarea></div>
    </div>
    <div class="check-row">
      <label class="check-item"><input type="checkbox" id="f-chr"> ✝️ Christian-Founded</label>
      <label class="check-item"><input type="checkbox" id="f-brk"> 🤝 Broker Involved</label>
      <label class="check-item"><input type="checkbox" id="f-sf"> 💰 Seller Finance</label>
      <label class="check-item"><input type="checkbox" id="f-sba"> 🏦 SBA Eligible</label>
    </div>
    <div class="calc-prev" id="calc-prev"></div>
    <div style="display:flex;gap:10px;margin-top:14px">
      <button class="btn btn-gold" onclick="submitLead()" style="padding:10px 22px">Add Lead</button>
      <button class="btn btn-sec" onclick="hideModal()" style="padding:10px 16px">Cancel</button>
    </div>
  </div>
</div>

<script>
// ── CREDENTIALS (injected by Cloudflare Worker) ───────────────────────────────
const CREDS = {
  username: "{{DS_USERNAME}}",
  password: "{{DS_PASSWORD}}",
  anthropicKey: "{{ANTHROPIC_KEY}}",
  dropboxToken: "{{DROPBOX_TOKEN}}",
  sendrKey: "{{SENDR_KEY}}"
};

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const STAGES=["New Lead","Researching","Qualified","Approached","In Conversation","Offer Sent","Under LOI","Due Diligence","Closed Won","Closed Lost","Watch List"];
const SC={"New Lead":"#6366f1","Researching":"#818cf8","Qualified":"#30D158","Approached":"#0A84FF","In Conversation":"#BF5AF2","Offer Sent":"#F5A623","Under LOI":"#FF9F0A","Due Diligence":"#64D2FF","Closed Won":"#30D158","Closed Lost":"#3a3a3a","Watch List":"#636366"};
const ROLAND_PROMPT=\`You are Roland Frasier — the world's foremost expert on acquiring businesses with little to no money down using the EPIC (Ethical Profits In Crisis) framework. Direct, tactical, no-nonsense. You are a deal architect not a cheerleader.

Peter Kolat is your student. He acquires service-based businesses (coaching, events, PD, masterminds) in the $1.5M–$3M range. Criteria: $300K+ EBITDA, Christian or values-aligned founders preferred, 6-figure clients paying $10K+/year, off-market preferred, seller financing preferred, $10K/month target post-acquisition draw.

Rules for every response:
1. Tell Peter EXACTLY what to do RIGHT NOW at his current stage
2. Give the tactical Roland framework behind it  
3. Provide word-for-word scripts, templates, or checklists when relevant
4. Zero fluff. Direct and specific.
5. Reference EPIC framework, zero-down structures, seller finance, earnouts, equity rollovers, CFE

Always end with bold "Next step:" + the single most important action right now.\`;

const STAGE_BRIEF={"New Lead":"Do NOT approach yet. First: (1) Research founder on LinkedIn for exit signals, (2) Estimate EBITDA from public signals, (3) Check broker involvement, (4) Score against your criteria. Most buyers rush and kill the deal before it starts.","Researching":"Build your one-page deal brief: revenue, EBITDA, team, client count, churn signals. Find 3 personal connection points before outreach. Your approach angle matters more than your offer price.","Qualified":"Make first contact — but NOT 'I want to buy your business.' Lead with value. First message doesn't mention acquisition. Get a 20-minute discovery call framed as exploring strategic partnership.","Approached":"Get them talking about THEIR goals. Ask: 'What does your ideal outcome look like in 3-5 years?' Listen for pain. They'll tell you exactly how to structure the offer.","In Conversation":"Transition from rapport to deal. Float 'strategic partnership' before acquisition. Get their number. Share your model. Get their P&L last 3 years.","Offer Sent":"Never negotiate against yourself. Let them respond first. If they counter, wait 24 hours. Focus on TERMS — seller finance, earnout, equity rollover close gaps cash can't.","Under LOI":"Start due diligence immediately. SBA pre-approval in parallel. Hire deal attorney NOW. Look for skeletons: client concentration, key person dependency, revenue trends.","Due Diligence":"Verify every number independently. Talk to 3-5 clients. Assess key person risk. Build your 90-day post-acquisition plan now."};
const NEXT_STEP={"New Lead":"Score this lead against your criteria before doing anything else.","Researching":"Build your one-page deal brief and identify your approach angle.","Qualified":"Draft your first outreach — lead with value, not acquisition intent.","Approached":"Schedule a 20-minute discovery call. Prepare your 5 key questions.","In Conversation":"Get their 3-year P&L and ask about their ideal exit outcome.","Offer Sent":"Wait for their response. Do not follow up for at least 48 hours.","Under LOI":"Send due diligence request list within 24 hours of signing.","Due Diligence":"Verify revenue with bank statements — never trust P&L alone.","Closed Won":"Execute your 90-day post-acquisition plan immediately."};

// ── STATE ─────────────────────────────────────────────────────────────────────
let leads=JSON.parse(localStorage.getItem('ds_leads')||'[]');
let sel=null,dTab='overview',rLead=null,rMsgs=[],agentRunning=false,filterSt='All';
const save=()=>localStorage.setItem('ds_leads',JSON.stringify(leads));
const fmt=n=>!n||n===0?'TBD':n>=1000000?\`$\${(n/1e6).toFixed(2)}M\`:\`$\${(n/1e3).toFixed(0)}K\`;
const sc=s=>s>=80?'#30D158':s>=60?'#F5A623':s>0?'#FF453A':'#636366';
const mc=s=>s>=80?'#FF453A':s>=60?'#F5A623':'#636366';
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function doLogin(){
  const u=document.getElementById('lu').value.trim();
  const p=document.getElementById('lp').value.trim();
  if(u===CREDS.username&&p===CREDS.password){
    document.getElementById('login-screen').style.display='none';
    document.getElementById('app').classList.add('on');
    initApp();
  }else{
    document.getElementById('lerr').textContent='Incorrect credentials.';
    document.getElementById('lp').value='';
  }
}
document.getElementById('lp').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin()});
document.getElementById('lu').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin()});
function doLogout(){
  document.getElementById('app').classList.remove('on');
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('lu').value='';document.getElementById('lp').value='';
  document.getElementById('lerr').textContent='';
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function initApp(){renderPipeline();renderList();renderSetup();initRoland();updateStats();}
function updateStats(){
  const hot=leads.filter(l=>l.dealScore>=80).length;
  const bud=leads.filter(l=>l.financeable).length;
  document.getElementById('ts-leads').textContent=\`\${leads.length} leads\`;
  document.getElementById('ts-hot').textContent=\`\${hot} hot\`;
  document.getElementById('ts-bud').textContent=\`\${bud} in budget\`;
}

// ── TABS ──────────────────────────────────────────────────────────────────────
function goTab(t){
  document.querySelectorAll('.ntab').forEach(b=>b.classList.toggle('on',b.dataset.t===t));
  ['pipeline','leads','roland','agent','setup'].forEach(id=>{
    const el=document.getElementById('p-'+id);if(!el)return;
    const isPage=el.classList.contains('page');
    const isSplit=el.classList.contains('split');
    if(isPage){el.classList.toggle('on',id===t);el.style.display=id===t?'flex':'none';}
    if(isSplit){el.classList.toggle('on',id===t);el.style.display=id===t?'flex':'none';}
  });
  if(t==='pipeline')renderPipeline();
  if(t==='leads')renderList();
}

// ── PIPELINE ──────────────────────────────────────────────────────────────────
function renderPipeline(){
  const hot=leads.filter(l=>l.dealScore>=80).length;
  const bud=leads.filter(l=>l.financeable).length;
  const mot=leads.filter(l=>l.motivationScore>=80).length;
  document.getElementById('stat-grid').innerHTML=[
    {icon:'◎',val:leads.length,lbl:'Total Leads',sub:'In pipeline',a:'#30D158'},
    {icon:'◉',val:hot,lbl:'Hot Leads',sub:'Deal score 80+',a:'#FF453A'},
    {icon:'◈',val:mot,lbl:'High Motivation',sub:'Sellers ready to move',a:'#F5A623'},
    {icon:'◦',val:bud,lbl:'In Budget',sub:'$1.5M – $3M range',a:'#0A84FF'},
  ].map(s=>\`<div class="scard"><div class="scard-icon">\${s.icon}</div><div class="scard-val">\${s.val}</div><div class="scard-lbl">\${s.lbl}</div><div class="scard-sub">\${s.sub}</div><div class="scard-accent" style="background:\${s.a}"></div></div>\`).join('');
  const active=STAGES.filter(st=>leads.some(l=>l.status===st));
  document.getElementById('kanban').innerHTML=active.length===0
    ?'<div style="color:var(--text4);font-size:12px;padding:16px">No leads yet. Click "+ Add Lead" to get started.</div>'
    :active.map(st=>{
      const c=SC[st]||'#636366';
      return\`<div class="kcol"><div class="kcol-head"><span class="kcol-lbl" style="color:\${c}">\${esc(st)}</span><span class="kcol-cnt" style="background:\${c}18;color:\${c}">\${leads.filter(l=>l.status===st).length}</span></div>\${leads.filter(l=>l.status===st).map(l=>\`<div class="kcard" onclick="openFromPipeline(\${l.id})"><div class="kcard-name">\${esc(l.name)}</div><div class="kcard-meta">\${esc(l.location||'')} · \${fmt(l.ebitda)}</div><div class="kcard-scores"><span style="font-size:9px;color:\${sc(l.dealScore)};font-weight:700">▲ \${l.dealScore||'–'}</span><span style="font-size:9px;color:\${mc(l.motivationScore)}">🔥 \${l.motivationScore||'–'}</span></div></div>\`).join('')}</div>\`;
    }).join('');
}
function openFromPipeline(id){goTab('leads');setTimeout(()=>selectLead(id),80);}

// ── LEADS ─────────────────────────────────────────────────────────────────────
function setFilter(s){
  filterSt=s;
  document.querySelectorAll('.fbtn').forEach(b=>b.classList.toggle('on',b.textContent===s));
  renderList();
}
function renderList(){
  document.getElementById('filter-wrap').innerHTML=['All',...STAGES].map(s=>\`<button class="fbtn\${s===filterSt?' on':''}" onclick="setFilter('\${esc(s)}')">\${esc(s)}</button>\`).join('');
  const q=(document.getElementById('search-in')?.value||'').toLowerCase();
  const filtered=leads.filter(l=>(filterSt==='All'||l.status===filterSt)&&(!q||l.name?.toLowerCase().includes(q)||l.founder?.toLowerCase().includes(q)||l.location?.toLowerCase().includes(q)));
  document.getElementById('leads-list').innerHTML=filtered.length===0
    ?'<div style="padding:22px;font-size:12px;color:var(--text4);text-align:center">No leads found.<br>Add your first lead to get started.</div>'
    :filtered.map(l=>{
      const c=SC[l.status]||'#636366';
      return\`<div class="litem\${sel?.id===l.id?' on':''}" onclick="selectLead(\${l.id})"><div class="litem-score" style="color:\${sc(l.dealScore)}">\${l.dealScore||'–'}</div><div class="litem-name">\${esc(l.name)}</div><div class="litem-meta">\${esc(l.founder||'')} · \${esc(l.location||'')}</div><div class="litem-badges"><span class="badge" style="background:\${c}18;color:\${c}">\${esc(l.status)}</span>\${l.ebitda>0?\`<span style="font-size:9px;color:var(--gold);font-weight:600">\${fmt(l.ebitda)} EBITDA</span>\`:''}\${l.motivationScore>0?\`<span style="font-size:9px;color:\${mc(l.motivationScore)};margin-left:auto">🔥 \${l.motivationScore}</span>\`:''}</div></div>\`;
    }).join('');
}
function selectLead(id){
  sel=leads.find(l=>l.id===id);if(!sel)return;
  document.getElementById('no-sel').style.display='none';
  document.getElementById('detail').style.display='flex';
  document.getElementById('detail').style.flexDirection='column';
  renderList();renderDetail();
}
function closeDetail(){
  sel=null;
  document.getElementById('detail').style.display='none';
  document.getElementById('no-sel').style.display='flex';
  renderList();
}

// ── DETAIL ────────────────────────────────────────────────────────────────────
function goDTab(t){
  dTab=t;
  document.querySelectorAll('.dtab').forEach(b=>b.classList.toggle('on',b.dataset.d===t));
  renderDetail();
}
function renderDetail(){
  if(!sel)return;
  const l=sel,c=SC[l.status]||'#636366';
  document.getElementById('d-name').textContent=l.name;
  document.getElementById('d-sub').textContent=\`\${l.founder||''} · \${l.location||''} · \${l.employees||0} employees\`;
  document.getElementById('d-badges').innerHTML=\`<span class="badge" style="background:\${c}18;color:\${c}">\${esc(l.status)}</span><span class="badge" style="background:\${l.christianBased?'#30D15818':'#F5A62318'};color:\${l.christianBased?'#30D158':'#F5A623'}">\${esc(l.faithLabel||'Unknown')}</span>\${l.broker?'<span class="badge" style="background:#6366f118;color:#818cf8">Broker</span>':''}\${l.financeable?'<span class="badge" style="background:#30D15818;color:#30D158">✓ In Budget</span>':l.ebitda>0?'<span class="badge" style="background:#FF453A18;color:#FF453A">⚠ Check Budget</span>':''}<button class="btn btn-ghost btn-xs" onclick="sendToRoland(\${l.id})" style="margin-left:6px;font-size:9px">🎯 Ask Roland</button>\`;
  document.getElementById('d-body').classList.add('fade-in');
  if(dTab==='overview')renderOverview(l);
  else if(dTab==='contacts')renderContacts(l);
  else renderOffers(l);
}
function renderOverview(l){
  const facts=[['Asking Price',l.askingPrice?fmt(l.askingPrice):'Not Listed'],['EBITDA',fmt(l.ebitda)],['Revenue',fmt(l.revenue)],['Employees',l.employees||'–'],['Location',l.location||'–'],['Industry',l.industry||'–'],['Multiple',l.revenueMultiple||'TBD'],['Acq. Range',l.acquisitionLow?\`\${fmt(l.acquisitionLow)} – \${fmt(l.acquisitionHigh)}\`:'TBD'],['Debt Svc/mo',l.debtServiceMonthly?\`$\${Number(l.debtServiceMonthly).toLocaleString()}\`:'TBD'],['DSCR',l.dscr||'TBD'],['Seller Finance',l.sellerFinance?'✅ Yes':'❌ No'],['SBA Eligible',l.sbaEligible?'✅ Yes':'❌ No']];
  document.getElementById('d-body').innerHTML=\`
    <div class="scores-row mb12">\${[['Deal Score',l.dealScore,'◎'],['Faith Score',l.faithScore,'✝'],['Fit Score',l.fitScore,'◈'],['Motivation',l.motivationScore,'🔥']].map(([lb,s,ic])=>\`<div class="sbox" style="border-color:\${sc(s)}22"><div style="font-size:14px;margin-bottom:4px">\${ic}</div><div class="sbox-val" style="color:\${sc(s)}">\${s||'–'}</div><div class="sbox-lbl">\${lb}</div></div>\`).join('')}</div>
    \${l.motivationScore>0?\`<div class="mot-wrap mb12" style="border-color:\${mc(l.motivationScore)}22"><div class="mot-head"><span style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:\${mc(l.motivationScore)}">🔥 Seller Motivation</span><span style="font-size:19px;font-weight:800;color:\${mc(l.motivationScore)}">\${l.motivationScore}<span style="font-size:11px;color:var(--text4)">/100</span></span></div><div class="mot-bar-bg"><div class="mot-bar" style="width:\${l.motivationScore}%;background:\${mc(l.motivationScore)}"></div></div>\${(l.motivationReasons||[]).map(r=>\`<div class="mot-r">• \${esc(r)}</div>\`).join('')}</div>\`:''}
    <div class="mb12"><div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:9px">💡 QUICK FACTS</div><div class="fact-table">\${facts.map(([k,v])=>\`<div class="fact-row"><span class="fact-k">\${esc(k)}</span><span class="fact-v">\${esc(String(v))}</span></div>\`).join('')}</div>\${l.financeNote?\`<div class="\${l.financeable?'green-pill':'red-pill'}">💰 \${esc(l.financeNote)}</div>\`:''}</div>
    <div class="mb12"><div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:9px">📡 LISTING & CONTACT</div><div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:8px">\${l.listingUrl?\`<a href="\${esc(l.listingUrl)}" target="_blank" class="clink">🔗 View Listing</a>\`:''}\${l.contactEmail?\`<a href="mailto:\${esc(l.contactEmail)}" class="clink">✉️ \${esc(l.contactEmail)}</a>\`:''}\${l.contactPhone?\`<span class="clink">📞 \${esc(l.contactPhone)}</span>\`:''}\${l.linkedIn?\`<a href="\${esc(l.linkedIn)}" target="_blank" class="clink">💼 LinkedIn</a>\`:''}</div>\${l.broker&&l.brokerName?\`<div style="padding:9px 12px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.15);border-radius:9px"><div style="font-size:10px;color:#818cf8;font-weight:700;margin-bottom:2px">🤝 Broker: \${esc(l.brokerName)}</div>\${l.brokerContact?\`<div style="font-size:11px;color:var(--text4)">\${esc(l.brokerContact)}</div>\`:''}</div>\`:\`<div class="green-pill">✓ No broker — direct founder approach recommended</div>\`}</div>
    \${(l.exitSignals||[]).length>0?\`<div class="mb12"><div style="font-size:10px;font-weight:700;color:#F5A623;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:9px">🚪 EXIT SIGNALS</div><div class="fact-table">\${l.exitSignals.map(e=>\`<div class="fact-row" style="color:#FFD60A">• \${esc(e)}</div>\`).join('')}</div></div>\`:''}
    \${l.sourceDetail?\`<div class="mb12"><div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">📡 SOURCE: \${esc(l.source||'')}</div><div style="font-size:12px;color:var(--text3)">\${esc(l.sourceDetail)}</div></div>\`:''}
    <div><div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:7px">MOVE STAGE</div><select class="fi" style="width:100%" onchange="updateField(\${l.id},'status',this.value)">\${STAGES.map(s=>\`<option value="\${s}"\${l.status===s?' selected':''}>\${s}</option>\`).join('')}</select></div>
  \`;
}
function renderContacts(l){
  document.getElementById('d-body').innerHTML=\`<div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">PEOPLE CONNECTED</div>\${(l.contacts||[]).length===0?'<div style="font-size:12px;color:var(--text4);margin-bottom:16px">No contacts yet.</div>':''}\${(l.contacts||[]).map(c=>\`<div class="card mb10"><div style="font-size:12px;font-weight:700;color:var(--text)">\${esc(c.name)}</div><div style="font-size:10px;color:var(--text4);margin-bottom:5px">\${esc(c.role||'')}</div><div style="display:flex;flex-wrap:wrap;gap:3px">\${c.email?\`<a href="mailto:\${esc(c.email)}" class="clink">✉️ \${esc(c.email)}</a>\`:''}\${c.phone?\`<span class="clink">📞 \${esc(c.phone)}</span>\`:''}</div>\${c.notes?\`<div style="font-size:11px;color:var(--text4);margin-top:6px">\${esc(c.notes)}</div>\`:''}</div>\`).join('')}<div class="card"><div class="card-title">+ Add Contact</div><div class="form-grid" style="margin-bottom:9px"><div class="ff"><label class="fl">Name</label><input class="fi" id="c-n" placeholder="Full name"></div><div class="ff"><label class="fl">Role</label><input class="fi" id="c-r" placeholder="e.g. Founder, Broker"></div><div class="ff"><label class="fl">Email</label><input class="fi" id="c-e" type="email"></div><div class="ff"><label class="fl">Phone</label><input class="fi" id="c-p"></div><div class="ff full"><label class="fl">Notes</label><textarea class="fi" id="c-no" rows="2"></textarea></div></div><button class="btn btn-gold btn-xs" onclick="addContact(\${l.id})" style="padding:7px 16px;font-size:11px">Add Contact</button></div>\`;
}
function renderOffers(l){
  document.getElementById('d-body').innerHTML=\`<div class="card mb12"><div class="card-title">📄 Offer Tracking</div>\${l.offerAmount?\`<div class="offer-block"><div style="font-size:12px;color:#FFD60A;font-weight:700">Offer: \${esc(l.offerAmount)}</div><div style="font-size:10px;color:var(--text4)">\${esc(l.offerDate||'')}</div></div>\`:''}<input class="fi" id="off-in" placeholder="Enter offer amount e.g. $1,750,000" style="width:100%;margin-bottom:9px"><button class="btn" onclick="saveOffer(\${l.id})" style="background:#F5A623;color:#000;padding:7px 16px;font-size:11px;font-weight:700;border:none;border-radius:7px;cursor:pointer">Record Offer</button></div><div class="card"><div class="card-title">📝 Notes Log</div>\${l.notes?\`<div class="note-block">\${esc(l.notes)}</div>\`:''}<textarea class="fi" id="note-in" rows="3" placeholder="Add a timestamped note..." style="width:100%;margin-bottom:9px;resize:vertical"></textarea><button class="btn btn-sec btn-xs" onclick="saveNote(\${l.id})" style="padding:7px 14px;font-size:11px">Save Note</button></div>\`;
}

// ── LEAD ACTIONS ──────────────────────────────────────────────────────────────
function updateField(id,f,v){const l=leads.find(x=>x.id===id);if(!l)return;l[f]=v;if(sel?.id===id)sel[f]=v;save();renderPipeline();renderList();updateStats();}
function addContact(id){const l=leads.find(x=>x.id===id);if(!l)return;const name=document.getElementById('c-n')?.value?.trim();if(!name)return;if(!l.contacts)l.contacts=[];l.contacts.push({id:Date.now(),name,role:document.getElementById('c-r')?.value||'',email:document.getElementById('c-e')?.value||'',phone:document.getElementById('c-p')?.value||'',notes:document.getElementById('c-no')?.value||''});if(sel?.id===id)sel.contacts=l.contacts;save();renderContacts(l);}
function saveOffer(id){const v=document.getElementById('off-in')?.value?.trim();if(!v)return;const ts=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});updateField(id,'offerAmount',v);updateField(id,'offerDate',ts);updateField(id,'status','Offer Sent');renderOffers(leads.find(x=>x.id===id));}
function saveNote(id){const v=document.getElementById('note-in')?.value?.trim();if(!v)return;const l=leads.find(x=>x.id===id);if(!l)return;const ts=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});l.notes=(l.notes?l.notes+'\n\n':'')+\`[\${ts}] \${v}\`;if(sel?.id===id)sel.notes=l.notes;save();renderOffers(l);}
function sendToRoland(id){rLead=leads.find(l=>l.id===id);document.getElementById('r-sel').value=id;goTab('roland');setTimeout(()=>setRDeal(id),100);}

// ── ADD LEAD ──────────────────────────────────────────────────────────────────
function calcPrev(){
  const e=parseFloat(document.getElementById('f-ebitda')?.value)||0;
  const r=parseFloat(document.getElementById('f-rev')?.value)||0;
  const a=parseFloat(document.getElementById('f-ask')?.value)||0;
  const el=document.getElementById('calc-prev');
  if(!e){el.style.display='none';return;}
  const lo=e*3,hi=e*6,pr=a||(lo+hi)/2,fin=pr>=1500000&&pr<=3000000;
  el.style.display='block';
  el.textContent=\`📊  Est. Range: \${fmt(lo)} – \${fmt(hi)}  ·  \${r>0?(pr/r).toFixed(2)+'x rev / ':''}\${(pr/e).toFixed(1)}x EBITDA  ·  \${fin?'✅ Within $1.5M–$3M budget':'⚠️ Outside target budget'}\`;
}
function showModal(){document.getElementById('modal').classList.add('on');}
function hideModal(){
  document.getElementById('modal').classList.remove('on');
  document.getElementById('calc-prev').style.display='none';
  ['f-name','f-founder','f-age','f-loc','f-ind','f-emp','f-rev','f-ebitda','f-ask','f-email','f-phone','f-li','f-url','f-src','f-notes','f-bn','f-bc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  ['f-chr','f-brk','f-sf','f-sba'].forEach(id=>{const el=document.getElementById(id);if(el)el.checked=false;});
}
function submitLead(){
  const name=document.getElementById('f-name')?.value?.trim();if(!name){alert('Company name is required.');return;}
  const e=parseFloat(document.getElementById('f-ebitda')?.value)||0;
  const r=parseFloat(document.getElementById('f-rev')?.value)||0;
  const ask=parseFloat(document.getElementById('f-ask')?.value)||null;
  const lo=e*3,hi=e*6,pr=ask||(lo+hi)/2,fin=pr>=1500000&&pr<=3000000;
  const chr=document.getElementById('f-chr')?.checked;
  const brk=document.getElementById('f-brk')?.checked;
  const sf=document.getElementById('f-sf')?.checked;
  const sba=document.getElementById('f-sba')?.checked;
  const ds=Math.min(100,Math.round((e>=300000?30:e/300000*30)+(fin?20:10)+(sf?15:0)+(chr?15:8)+(!brk?10:5)+(sba?10:0)));
  leads.push({id:Date.now(),name,founder:document.getElementById('f-founder')?.value||'',founderAge:parseInt(document.getElementById('f-age')?.value)||0,location:document.getElementById('f-loc')?.value||'',industry:document.getElementById('f-ind')?.value||'',employees:parseInt(document.getElementById('f-emp')?.value)||0,revenue:r,ebitda:e,askingPrice:ask,acquisitionLow:lo,acquisitionHigh:hi,revenueMultiple:r>0&&e>0?\`\${(pr/r).toFixed(2)}x rev / \${(pr/e).toFixed(1)}x EBITDA\`:'TBD',financeable:fin,financeNote:fin?'Within $1.5M–$3M budget. SBA + seller finance viable.':'Outside target range — consider CFE or creative structure.',debtServiceMonthly:Math.round(pr*0.07/12),dscr:e>0&&pr>0?((e/(pr*0.07/12*12))).toFixed(2)+'x':'TBD',dealScore:ds,faithScore:chr?88:62,fitScore:ds,motivationScore:50,motivationReasons:['Newly added — research needed'],faithLabel:chr?'Christian-Founded':'Values-Aligned / TBD',christianBased:chr,broker:brk,sellerFinance:sf,sbaEligible:sba,brokerName:document.getElementById('f-bn')?.value||'',brokerContact:document.getElementById('f-bc')?.value||'',contactEmail:document.getElementById('f-email')?.value||'',contactPhone:document.getElementById('f-phone')?.value||'',linkedIn:document.getElementById('f-li')?.value||'',listingUrl:document.getElementById('f-url')?.value||'',source:document.getElementById('f-src')?.value||'Manual Entry',sourceDetail:document.getElementById('f-notes')?.value||'',status:'New Lead',notes:'',offerAmount:'',offerDate:'',contacts:[],exitSignals:[],faithSignals:[],highlights:[],redFlags:[]});
  save();hideModal();renderPipeline();renderList();renderRSel();updateStats();
}

// ── ROLAND ────────────────────────────────────────────────────────────────────
function initRoland(){
  rMsgs=[{role:'assistant',content:\`Good. Let's get to work.\n\nI'm Roland Frasier. I guide acquisitions start to finish — sourcing, approaching, structuring, due diligence, and closing with minimal capital out of pocket.\n\nSelect a deal from the dropdown for stage-specific coaching, or ask me anything about deal sourcing, structuring, or closing.\n\n**Next step:** Tell me which deal you're working and what stage you're at.\`}];
  renderMsgs();renderRSel();
}
function renderRSel(){
  const s=document.getElementById('r-sel');if(!s)return;
  const prev=s.value;
  s.innerHTML='<option value="">— No deal selected —</option>'+leads.map(l=>\`<option value="\${l.id}"\${String(l.id)===prev?' selected':''}>\${esc(l.name)} (\${esc(l.status)})</option>\`).join('');
}
function setRDeal(id){
  rLead=id?leads.find(l=>l.id===parseInt(id)):null;
  const chip=document.getElementById('r-chip');
  if(rLead){
    chip.classList.add('on');
    document.getElementById('r-chip-name').textContent=rLead.name;
    const g=STAGE_BRIEF[rLead.status]||\`You're at \${rLead.status} stage. Tell me where things stand.\`;
    const ns=NEXT_STEP[rLead.status]||'Tell me where you are and I will give you your next move.';
    rMsgs.push({role:'assistant',content:\`Deal loaded: **\${rLead.name}**\n\n📍 Stage: \${rLead.status}\n💰 EBITDA: \${fmt(rLead.ebitda)}\n▲ Deal Score: \${rLead.dealScore||'–'}\n🔥 Motivation: \${rLead.motivationScore||'–'}/100\n\nHere is exactly what you should be doing RIGHT NOW:\n\n\${g}\n\n**Next step:** \${ns}\`});
    renderMsgs();
  }else{chip.classList.remove('on');}
}
function renderMsgs(){
  const c=document.getElementById('r-msgs');if(!c)return;
  c.innerHTML=rMsgs.map(m=>\`<div class="msg \${m.role}">\${m.role==='assistant'?'<div class="msg-av">🎯</div>':''}<div class="msg-bub \${m.role==='assistant'?'ai':'user'}">\${fmtMsg(esc(m.content))}</div></div>\`).join('');
  c.scrollTop=c.scrollHeight;
}
function fmtMsg(t){return t.replace(/\*\*(.+?)\*\*/g,'<strong style="color:var(--gold)">$1</strong>').replace(/\n/g,'<br>');}
function addTyping(){const c=document.getElementById('r-msgs');const d=document.createElement('div');d.className='msg assistant';d.id='typing';d.innerHTML='<div class="msg-av">🎯</div><div class="msg-bub ai"><div style="display:flex;gap:4px;align-items:center;padding:2px 0"><div class="typing-dot"></div><div class="typing-dot" style="margin:0 2px"></div><div class="typing-dot"></div></div></div>';c.appendChild(d);c.scrollTop=c.scrollHeight;}
function removeTyping(){document.getElementById('typing')?.remove();}
async function sendMsg(){
  const inp=document.getElementById('r-input');
  const txt=inp?.value?.trim();if(!txt)return;
  inp.value='';
  rMsgs.push({role:'user',content:txt});renderMsgs();addTyping();
  const ctx=rLead?\`\n\nActive deal: \${rLead.name}, Stage: \${rLead.status}, EBITDA: \${fmt(rLead.ebitda)}, Asking: \${fmt(rLead.askingPrice)}, Motivation: \${rLead.motivationScore}/100, Faith: \${rLead.faithLabel}, Location: \${rLead.location}, Employees: \${rLead.employees}\`:'';
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:ROLAND_PROMPT+ctx,messages:rMsgs.map(m=>({role:m.role,content:m.content}))})});
    const d=await res.json();
    removeTyping();
    rMsgs.push({role:'assistant',content:d.content?.[0]?.text||'Connection error. Check your Anthropic API key in Cloudflare Environment Variables.'});
  }catch{removeTyping();rMsgs.push({role:'assistant',content:'Connection error. Make sure your ANTHROPIC_KEY is set in Cloudflare Workers & Pages → Settings → Variables and Secrets.'});}
  renderMsgs();
}
async function genDoc(type){
  if(!rLead){alert('Select an active deal from the dropdown above first.');return;}
  document.getElementById('gen-st').textContent='Generating...';
  const l=rLead;
  const prompts={loi:\`Generate a professional Letter of Intent (LOI) for Peter Kolat to acquire \${l.name}. Asking \${fmt(l.askingPrice)}, EBITDA \${fmt(l.ebitda)}, location \${l.location}. Roland Frasier EPIC framework. Seller financing preferred. Include: purchase price, structure, due diligence 30 days, closing 60 days, exclusivity, conditions. Professional but founder-friendly. Peter's email: peter@polishpeter.com\`,dd:\`Comprehensive due diligence checklist for acquiring \${l.name}, \${l.industry} business, \${l.employees} employees, \${fmt(l.ebitda)} EBITDA. Roland Frasier framework. Categories: Financial, Legal, Operational, Client/Customer, Team/HR, Technology, Market. Flag high-risk with ⚠️. Be specific.\`,script:\`Personalized seller approach script for Peter Kolat contacting \${l.founder||'the founder'} at \${l.name}. Context: \${l.sourceDetail||'Found through research'}. Faith: \${l.faithLabel}. Motivation: \${(l.motivationReasons||[]).join(', ')||'Research needed'}. Roland Frasier style — do NOT reveal acquisition intent upfront. Frame as strategic partnership. Include: opening, rapport builders, discovery questions, handling 'are you trying to buy my business?', closing for follow-up. Sound like Peter Kolat talking, not a robot.\`};
  const titles={loi:'Letter of Intent',dd:'Due Diligence Checklist',script:'Seller Approach Script'};
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:ROLAND_PROMPT,messages:[{role:'user',content:prompts[type]}]})});
    const d=await res.json();
    document.getElementById('doc-title').textContent=\`\${titles[type]} — \${l.name}\`;
    document.getElementById('doc-body').textContent=d.content?.[0]?.text||'Error generating.';
    document.getElementById('doc-panel').classList.add('on');
  }catch{alert('Error. Check your ANTHROPIC_KEY in Cloudflare Variables and Secrets.');}
  document.getElementById('gen-st').textContent='';
}
function copyDoc(){const c=document.getElementById('doc-body')?.textContent;if(c)navigator.clipboard.writeText(c).then(()=>{const b=document.getElementById('copy-btn');if(b){b.textContent='✓ Copied!';setTimeout(()=>b.textContent='📋 Copy',2000);}});}

// ── AGENT ─────────────────────────────────────────────────────────────────────
async function runAgent(){
  if(agentRunning)return;agentRunning=true;goTab('agent');
  document.getElementById('agent-btn').textContent='● Scanning...';
  document.getElementById('agent-run-btn').textContent='● Scanning...';
  document.getElementById('agent-done').style.display='none';
  const box=document.getElementById('agent-log');box.innerHTML='';
  const steps=[{d:700,c:'#636366',t:'Initializing agent session...'},{d:750,c:'#a0a0a0',t:'🔍 Querying Sendr.io — filtering service businesses $1.5M–$3M revenue...'},{d:700,c:'#a0a0a0',t:'📋 Applying niche filters: coaching · events · personal development · mastermind...'},{d:750,c:'#a0a0a0',t:'✝️  Scoring founder profiles for Christian / values alignment signals...'},{d:700,c:'#a0a0a0',t:'🌐 Google discovery — off-market coaching businesses with exit signals...'},{d:750,c:'#a0a0a0',t:'🎙️ Podcast guest databases — founders on entrepreneurship + faith shows...'},{d:700,c:'#a0a0a0',t:'📣 Conference speaking rosters — coaching + business events...'},{d:750,c:'#a0a0a0',t:'👥 Facebook Groups: Christian Business Owners · Faith Entrepreneurs...'},{d:700,c:'#a0a0a0',t:'💼 LinkedIn: founders connecting with M&A advisors or posting exit signals...'},{d:750,c:'#F5A623',t:'🔥 Scoring seller motivation — exit signals · life changes · business trajectory...'},{d:700,c:'#a0a0a0',t:'💰 EBITDA estimates + revenue multiples + debt service calculations...'},{d:750,c:'#a0a0a0',t:'🤝 Flagging direct-to-founder vs. broker-involved opportunities...'},{d:700,c:'#a0a0a0',t:'📝 Scoring all candidates against your acquisition criteria...'},{d:500,c:'#30D158',t:'✅ Agent run complete. Add Sendr.io key in Cloudflare Variables to get real leads flowing.'}];
  for(let i=0;i<steps.length;i++){await new Promise(r=>setTimeout(r,steps[i].d));const row=document.createElement('div');row.className='log-line';row.innerHTML=\`<span class="log-num">[\${String(i+1).padStart(2,'0')}]</span><span style="color:\${steps[i].c}">\${steps[i].t}</span>\`;box.appendChild(row);box.scrollTop=box.scrollHeight;}
  agentRunning=false;
  document.getElementById('agent-btn').textContent='⚡ Run Agent';
  document.getElementById('agent-run-btn').textContent='⚡ Run Agent';
  document.getElementById('agent-done').style.display='block';
}

// ── SETUP ─────────────────────────────────────────────────────────────────────
function renderSetup(){
  const mkRows=(rows)=>rows.map(([k,v,s])=>\`<div class="setup-row"><div><div style="font-size:12px;font-weight:600;color:var(--text)">\${esc(k)}</div><div style="font-size:10px;color:var(--text4)">\${esc(v)}</div></div><span style="font-size:11px;font-weight:600;color:\${s.startsWith('✅')?'#30D158':s.startsWith('⛔')?'#FF453A':'#F5A623'}"><span class="sdot" style="background:\${s.startsWith('✅')?'#30D158':s.startsWith('⛔')?'#FF453A':'#F5A623'}"></span>\${esc(s)}</span></div>\`).join('');
  document.getElementById('s-keys').innerHTML=mkRows([['Anthropic API Key','Powers Roland Coach AI — add in Cloudflare Variables & Secrets','✅ Stored in Cloudflare'],['Dropbox Token','Roland training files — add in Cloudflare Variables & Secrets','✅ Stored in Cloudflare'],['Sendr.io API Key','Off-market lead database — add in Cloudflare Variables & Secrets','✅ Stored in Cloudflare'],['DS_USERNAME','Your login username — set in Cloudflare Variables & Secrets','✅ Stored in Cloudflare'],['DS_PASSWORD','Your login password — set in Cloudflare Variables & Secrets','✅ Stored in Cloudflare'],['Alert Email','realestateblackbook@gmail.com','✅ Set'],['Outreach Email','peter@polishpeter.com','✅ Set'],['Alert Phone','586-321-6507','✅ Set']]);
  document.getElementById('s-status').innerHTML=mkRows([['Cloudflare Worker','Serving your dashboard securely','✅ Live'],['GitHub Repository','polishpeter/deals — source code backup','✅ Connected'],['Deal Scout CRM','Pipeline + Leads + Kanban + Notes','✅ Live'],['Roland Coach','AI coaching + LOI + DD + Scripts','✅ Live'],['Sourcing Agent','Sendr.io + Google + Social','⏳ Needs Sendr.io key'],['Gmail Alerts','Hot lead notifications','⏳ Needs Albato flow'],['SMS Alerts','Text on motivation score 80+','⏳ Needs Albato flow'],['GHL Pipeline','Lead Connector auto-sync','⏳ Needs Albato flow']]);
  document.getElementById('s-criteria').innerHTML=[['Primary Goal','Full Acquisition (Buyout)'],['Backup','Consult for Equity (CFE)'],['Budget','$1.5M – $3M'],['Min EBITDA','$300,000'],['Target Draw','$10K/mo post-acquisition'],['Industries','Coaching · Events · PD · Mastermind'],['Faith','Christian-preferred / Values-aligned OK'],['Geography','United States'],['Deal Type','Off-market preferred'],['Financing','SBA + Seller Finance flagged']].map(([k,v])=>\`<div class="setup-row"><span style="font-size:12px;color:var(--text4);font-weight:500">\${esc(k)}</span><span style="font-size:12px;color:var(--text);font-weight:600">\${esc(v)}</span></div>\`).join('');
}
<\/script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const username = env.DS_USERNAME || "admin";
    const password = env.DS_PASSWORD || "changeme";
    const anthropicKey = env.ANTHROPIC_KEY || "";
    const dropboxToken = env.DROPBOX_TOKEN || "";
    const sendrKey = env.SENDR_KEY || "";

    const html = HTML
      .replace("{{DS_USERNAME}}", username)
      .replace("{{DS_PASSWORD}}", password)
      .replace("{{ANTHROPIC_KEY}}", anthropicKey)
      .replace("{{DROPBOX_TOKEN}}", dropboxToken)
      .replace("{{SENDR_KEY}}", sendrKey);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "no-referrer"
      }
    });
  }
};
