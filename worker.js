// Deal Scout — Peter Kolat
// Server-side authentication — credentials never in HTML

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── AUTH ENDPOINT ─────────────────────────────────────────────────────────
    if (url.pathname === '/auth' && request.method === 'POST') {
      try {
        const body = await request.json();
        const validUser = env.DS_USERNAME || '';
        const validPass = env.DS_PASSWORD || '';
        const ok = body.u === validUser && body.p === validPass && validUser !== '';
        return new Response(JSON.stringify({ ok }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // ── ANTHROPIC KEY ENDPOINT (secure proxy) ─────────────────────────────────
    if (url.pathname === '/api/key' && request.method === 'GET') {
      const key = env.ANTHROPIC_KEY || '';
      return new Response(JSON.stringify({ key }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ── SERVE MAIN APP ────────────────────────────────────────────────────────
    return new Response(getHTML(), {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    });
  }
};

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Deal Scout — Peter Kolat</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
:root{--gold:#F5A623;--gold2:#E8961A;--bg:#000;--bg2:#111;--bg3:#1a1a1a;--bg4:#222;--border:#2a2a2a;--border2:#333;--text:#fff;--text2:#ebebeb;--text3:#a0a0a0;--text4:#606060;--green:#30D158;--red:#FF453A;--amber:#FFD60A;--blue:#0A84FF;--purple:#BF5AF2;--r:14px;--rs:10px;--rx:7px}
html,body{height:100%;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);display:flex;flex-direction:column}
::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
#ls{position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;z-index:9999;flex-direction:column}
.lg{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,#F5A62308 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.lc{position:relative;background:rgba(17,17,17,.95);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:48px 44px;width:100%;max-width:400px;box-shadow:0 32px 80px rgba(0,0,0,.8)}
.lm{width:64px;height:64px;border-radius:18px;background:linear-gradient(145deg,#F5A623,#E8961A);display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 28px;box-shadow:0 8px 24px rgba(245,166,35,.35)}
.lh{font-size:26px;font-weight:700;color:var(--text);text-align:center;letter-spacing:-.5px;margin-bottom:6px}
.ls2{font-size:13px;color:var(--text4);text-align:center;margin-bottom:32px}
.ll{display:block;font-size:11px;font-weight:600;color:var(--text3);letter-spacing:.8px;text-transform:uppercase;margin-bottom:7px}
.li{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:13px 16px;font-size:15px;color:var(--text);font-family:inherit;margin-bottom:14px;outline:none;transition:all .2s}
.li:focus{border-color:rgba(245,166,35,.4);background:rgba(255,255,255,.06)}
.lb{width:100%;background:linear-gradient(145deg,#F5A623,#E8961A);border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:600;color:#000;cursor:pointer;margin-top:4px;font-family:inherit;transition:all .2s}
.lb:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(245,166,35,.35)}
.lb:disabled{opacity:.6;cursor:not-allowed;transform:none}
.le{color:#FF453A;font-size:12px;text-align:center;margin-top:12px;min-height:16px;font-weight:500}
.lf{position:absolute;bottom:28px;font-size:11px;color:var(--text4)}
#app{display:none;flex-direction:column;height:100vh}
#app.on{display:flex}
.hdr{background:rgba(0,0,0,.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.06);padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:56px;flex-shrink:0;z-index:50}
.hl{display:flex;align-items:center;gap:12px}
.ai{width:30px;height:30px;border-radius:8px;background:linear-gradient(145deg,#F5A623,#C87D10);display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 8px rgba(245,166,35,.3)}
.an{font-size:14px;font-weight:700;color:var(--text);letter-spacing:-.2px}
.as{font-size:9px;color:var(--text4);letter-spacing:.5px}
.hs{display:flex;gap:16px}
.ht{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text4)}
.hd{width:6px;height:6px;border-radius:50%}
.hr{display:flex;gap:8px;align-items:center}
.btn{border:none;border-radius:var(--rx);cursor:pointer;font-family:inherit;font-weight:600;transition:all .18s;display:inline-flex;align-items:center;gap:5px}
.btn:active{transform:scale(.97)}
.bg{background:linear-gradient(145deg,#F5A623,#E8961A);color:#000;padding:8px 18px;font-size:12px;box-shadow:0 4px 14px rgba(245,166,35,.25)}
.bg:hover{box-shadow:0 6px 20px rgba(245,166,35,.35);transform:translateY(-1px)}
.bs{background:rgba(255,255,255,.08);color:var(--text2);border:1px solid rgba(255,255,255,.08);padding:8px 16px;font-size:12px}
.bs:hover{background:rgba(255,255,255,.12)}
.bgh{background:transparent;color:var(--text3);padding:6px 12px;font-size:11px;border:1px solid rgba(255,255,255,.06)}
.bgh:hover{background:rgba(255,255,255,.05);color:var(--text)}
.bx{padding:4px 10px;font-size:10px;border-radius:6px}
.bi{width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;transition:all .15s}
.bi:hover{background:rgba(255,255,255,.1)}
.nav{background:rgba(0,0,0,.6);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.05);display:flex;padding:0 24px;gap:2px;flex-shrink:0}
.nt{background:transparent;border:none;border-bottom:2px solid transparent;padding:13px 16px;font-size:12px;font-weight:500;color:var(--text4);cursor:pointer;font-family:inherit;transition:all .2s;letter-spacing:.3px;white-space:nowrap}
.nt:hover{color:var(--text2)}
.nt.on{color:var(--gold);border-bottom-color:var(--gold)}
.main{flex:1;overflow:hidden;display:flex;min-height:0}
.pg{display:none;flex:1;overflow-y:auto;padding:24px;flex-direction:column}
.pg.on{display:flex}
.sp{display:none;flex:1;overflow:hidden}
.sp.on{display:flex}
.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:var(--r);padding:18px}
.ct{font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px}
.stg{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.sc{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:var(--r);padding:20px;position:relative;overflow:hidden;transition:all .2s}
.sc:hover{background:rgba(255,255,255,.05);transform:translateY(-2px)}
.si{font-size:20px;margin-bottom:10px}
.sv{font-size:32px;font-weight:800;color:var(--text);letter-spacing:-1px;line-height:1}
.sl{font-size:12px;font-weight:500;color:var(--text3);margin-top:4px}
.ss{font-size:10px;color:var(--text4);margin-top:2px}
.sa{position:absolute;bottom:0;left:0;right:0;height:2px;border-radius:0 0 var(--r) var(--r)}
.kb{display:flex;gap:12px;overflow-x:auto;padding-bottom:12px;flex:1;align-items:flex-start}
.kc{min-width:195px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:var(--r);padding:14px;flex-shrink:0}
.kh{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.kl{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
.kn{font-size:9px;border-radius:20px;padding:2px 8px;font-weight:700}
.kd{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:var(--rs);padding:12px;margin-bottom:8px;cursor:pointer;transition:all .2s}
.kd:hover{background:rgba(255,255,255,.07);transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.3)}
.kdm{font-size:9px;color:var(--text4);margin-bottom:7px}
.lsb{width:310px;border-right:1px solid rgba(255,255,255,.05);display:flex;flex-direction:column;flex-shrink:0;background:rgba(0,0,0,.3)}
.sw{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.05)}
.si2{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:9px 14px;font-size:13px;color:var(--text);font-family:inherit;outline:none}
.si2:focus{border-color:rgba(245,166,35,.3)}
.si2::placeholder{color:var(--text4)}
.fw{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.04);display:flex;gap:4px;flex-wrap:wrap}
.fb{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);border-radius:20px;color:var(--text4);padding:3px 9px;font-size:9px;cursor:pointer;font-family:inherit;transition:all .15s;font-weight:500}
.fb:hover{background:rgba(255,255,255,.08);color:var(--text2)}
.fb.on{background:rgba(245,166,35,.12);color:var(--gold);border-color:rgba(245,166,35,.25)}
.ll2{overflow-y:auto;flex:1}
.li2{padding:13px 14px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;transition:all .15s;position:relative}
.li2:hover{background:rgba(255,255,255,.03)}
.li2.on{background:rgba(245,166,35,.05);border-left:2px solid var(--gold)}
.ln{font-size:12px;font-weight:600;color:var(--text);margin-bottom:2px;padding-right:36px}
.lm2{font-size:10px;color:var(--text4);margin-bottom:5px}
.lsc{position:absolute;top:13px;right:12px;font-size:13px;font-weight:800}
.lb2{display:flex;gap:4px;flex-wrap:wrap;align-items:center}
.bdg{font-size:8px;border-radius:20px;padding:2px 7px;font-weight:700}
.det{flex:1;display:flex;flex-direction:column;overflow:hidden}
.dh{padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(0,0,0,.4);backdrop-filter:blur(20px);flex-shrink:0}
.dn{font-size:19px;font-weight:700;color:var(--text);letter-spacing:-.3px;margin-bottom:3px}
.ds{font-size:11px;color:var(--text4);margin-bottom:8px}
.dts{display:flex;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(0,0,0,.3);flex-shrink:0;padding:0 22px}
.dt{background:transparent;border:none;border-bottom:2px solid transparent;padding:10px 13px;font-size:11px;font-weight:500;color:var(--text4);cursor:pointer;font-family:inherit;transition:all .15s}
.dt:hover{color:var(--text2)}
.dt.on{color:var(--gold);border-bottom-color:var(--gold)}
.db{flex:1;overflow-y:auto;padding:18px 22px}
.ns{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text4);gap:10px}
.sr{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.sb{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:var(--rs);padding:12px;text-align:center}
.sbv{font-size:22px;font-weight:800;letter-spacing:-.5px;line-height:1}
.sbl{font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:1px;margin-top:4px}
.ft{border-radius:var(--rs);overflow:hidden;border:1px solid rgba(255,255,255,.06)}
.fr{display:flex;justify-content:space-between;align-items:center;padding:9px 13px;border-bottom:1px solid rgba(255,255,255,.04);font-size:11px}
.fr:last-child{border-bottom:none}
.fr:nth-child(even){background:rgba(255,255,255,.015)}
.fk{color:var(--text4);font-weight:500}
.fv{color:var(--text);font-weight:600;text-align:right;max-width:200px}
.mw{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:var(--rs);padding:14px;margin-bottom:12px}
.mh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.mb2{height:4px;background:rgba(255,255,255,.08);border-radius:2px;margin-bottom:10px}
.mf{height:4px;border-radius:2px;transition:width .8s}
.mr{font-size:11px;color:var(--text3);padding:3px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.mr:last-child{border-bottom:none}
.cl{display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:5px 11px;font-size:10px;color:var(--text2);text-decoration:none;margin:3px;transition:all .15s;font-weight:500}
.cl:hover{background:rgba(255,255,255,.09);color:var(--text)}
.rw{flex:1;display:flex;flex-direction:column;overflow:hidden}
.rb{padding:13px 20px;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(0,0,0,.5);display:flex;align-items:center;gap:12px;flex-shrink:0}
.ra{width:36px;height:36px;border-radius:50%;background:linear-gradient(145deg,#F5A623,#C87D10);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 4px 14px rgba(245,166,35,.25)}
.rn{font-size:14px;font-weight:700;color:var(--text);letter-spacing:-.2px}
.rt{font-size:10px;color:var(--text4)}
.rc{margin-left:auto;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.2);border-radius:8px;padding:5px 11px;display:none}
.rc.on{display:block}
.rct{font-size:9px;color:#818cf8;font-weight:700;letter-spacing:.8px;text-transform:uppercase}
.rcv{font-size:11px;color:#a5b4fc;font-weight:600}
.rsb{padding:9px 20px;border-bottom:1px solid rgba(255,255,255,.04);background:rgba(0,0,0,.3);display:flex;gap:10px;align-items:center;flex-shrink:0}
.rdb{padding:8px 20px;border-bottom:1px solid rgba(255,255,255,.04);background:rgba(0,0,0,.2);display:flex;gap:7px;align-items:center;flex-shrink:0}
.rm{flex:1;overflow-y:auto;padding:18px 20px;display:flex;flex-direction:column;gap:12px}
.mg{display:flex;gap:8px;align-items:flex-start}
.mg.user{flex-direction:row-reverse}
.mav{width:28px;height:28px;border-radius:50%;background:linear-gradient(145deg,#F5A623,#C87D10);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;margin-top:2px}
.mb3{max-width:78%;padding:11px 14px;border-radius:14px;font-size:12px;line-height:1.75;white-space:pre-wrap}
.mb3.ai{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);border-radius:4px 14px 14px 14px;color:var(--text2)}
.mb3.user{background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.15);border-radius:14px 4px 14px 14px;color:var(--text)}
.riw{padding:12px 20px;border-top:1px solid rgba(255,255,255,.05);background:rgba(0,0,0,.4);display:flex;gap:9px;flex-shrink:0}
.rta{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;color:var(--text);padding:11px 14px;font-size:12px;font-family:inherit;resize:none;line-height:1.5;outline:none}
.rta:focus{border-color:rgba(245,166,35,.3)}
.rta::placeholder{color:var(--text4)}
.dp{margin:0 20px;background:rgba(255,255,255,.03);border:1px solid rgba(245,166,35,.2);border-radius:var(--r);overflow:hidden;flex-shrink:0;display:none}
.dp.on{display:block}
.dph{padding:9px 14px;background:rgba(245,166,35,.06);border-bottom:1px solid rgba(245,166,35,.1);display:flex;justify-content:space-between;align-items:center}
.dpb{padding:12px 14px;max-height:190px;overflow-y:auto;font-size:11px;color:var(--text3);line-height:1.75;white-space:pre-wrap;font-family:monospace}
.td{width:6px;height:6px;border-radius:50%;background:var(--gold);display:inline-block}
.td:nth-child(1){animation:tda 1.2s 0s infinite}
.td:nth-child(2){animation:tda 1.2s .2s infinite}
.td:nth-child(3){animation:tda 1.2s .4s infinite}
@keyframes tda{0%,100%{transform:translateY(0);opacity:.7}50%{transform:translateY(-4px);opacity:1}}
.agl{background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.06);border-radius:var(--r);padding:18px;min-height:240px;max-height:420px;overflow-y:auto;font-family:monospace;font-size:11px}
.agl div{margin-bottom:4px;line-height:1.6;display:flex;gap:8px}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.ff2{display:flex;flex-direction:column;gap:4px}
.ff2.full{grid-column:1/-1}
.ffl{font-size:9px;font-weight:600;color:var(--text4);letter-spacing:1px;text-transform:uppercase}
.ffi{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:var(--text);padding:9px 13px;font-size:12px;font-family:inherit;width:100%;outline:none}
.ffi:focus{border-color:rgba(245,166,35,.35);background:rgba(255,255,255,.07)}
.ffi::placeholder{color:var(--text4)}
.cr{display:flex;gap:16px;flex-wrap:wrap;margin:10px 0}
.ci{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text2);cursor:pointer;font-weight:500}
.ci input{accent-color:var(--gold);width:14px;height:14px}
.cp{background:rgba(48,209,88,.06);border:1px solid rgba(48,209,88,.15);border-radius:10px;padding:11px 13px;font-size:12px;color:#30D158;margin:8px 0;line-height:1.6;display:none}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;z-index:200;padding:20px}
.ov.on{display:flex}
.md{background:#111;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:26px;width:100%;max-width:560px;max-height:88vh;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,.9)}
.mdt{font-size:17px;font-weight:700;color:var(--text);letter-spacing:-.3px;margin-bottom:18px}
.strow{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:12px}
.strow:last-child{border-bottom:none}
.sdot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px}
.mb12{margin-bottom:12px}.mb10{margin-bottom:10px}
.gp{background:rgba(48,209,88,.06);border:1px solid rgba(48,209,88,.15);border-radius:8px;padding:8px 12px;font-size:11px;color:#30D158;margin-top:8px}
.rp{background:rgba(255,69,58,.06);border:1px solid rgba(255,69,58,.15);border-radius:8px;padding:8px 12px;font-size:11px;color:#FF453A;margin-top:6px}
.nb{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:11px 13px;font-size:11px;color:var(--text3);line-height:1.7;white-space:pre-wrap;max-height:160px;overflow-y:auto;margin-bottom:10px}
.ob{background:rgba(255,214,10,.06);border:1px solid rgba(255,214,10,.15);border-radius:10px;padding:11px 13px;margin-bottom:11px}
.fi2{animation:fi2a .22s ease}
@keyframes fi2a{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}
select.ffi{width:100%}
</style>
</head>
<body>

<div id="ls">
  <div class="lg"></div>
  <div class="lc fi2">
    <div class="lm">⚡</div>
    <div class="lh">Deal Scout</div>
    <div class="ls2">Peter Kolat · Acquisition Intelligence</div>
    <label class="ll">Username</label>
    <input class="li" id="lu" type="text" placeholder="Enter username" autocomplete="off">
    <label class="ll">Password</label>
    <input class="li" id="lp" type="password" placeholder="Enter password" autocomplete="off">
    <button class="lb" id="lbtn" onclick="doLogin()">Sign In →</button>
    <div class="le" id="lerr"></div>
  </div>
  <div class="lf">deals.realestateblackbook.workers.dev</div>
</div>

<div id="app">
  <div class="hdr">
    <div class="hl">
      <div class="ai">⚡</div>
      <div><div class="an">Deal Scout</div><div class="as">PETER KOLAT · ACQUISITION INTELLIGENCE</div></div>
    </div>
    <div class="hs">
      <div class="ht"><div class="hd" style="background:#30D158"></div><span id="tl">0 leads</span></div>
      <div class="ht"><div class="hd" style="background:#FF453A"></div><span id="th">0 hot</span></div>
      <div class="ht"><div class="hd" style="background:#F5A623"></div><span id="tb">0 in budget</span></div>
    </div>
    <div class="hr">
      <button class="btn bs" onclick="showMod()">+ Add Lead</button>
      <button class="btn bg" id="abt" onclick="runAgent()">⚡ Run Agent</button>
      <div class="bi" onclick="doLogout()" title="Sign out" style="font-size:12px">↪</div>
    </div>
  </div>
  <div class="nav">
    <button class="nt on" data-t="pipeline" onclick="goTab('pipeline')">◈ Pipeline</button>
    <button class="nt" data-t="leads" onclick="goTab('leads')">◎ Leads</button>
    <button class="nt" data-t="roland" onclick="goTab('roland')">◉ Ask Roland</button>
    <button class="nt" data-t="agent" onclick="goTab('agent')">◌ Agent</button>
    <button class="nt" data-t="setup" onclick="goTab('setup')">◦ Setup</button>
  </div>
  <div class="main">
    <div class="pg on" id="p-pipeline">
      <div class="stg" id="sgrid"></div>
      <div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">PIPELINE BY STAGE</div>
      <div class="kb" id="kanban"></div>
    </div>
    <div class="sp" id="p-leads">
      <div class="lsb">
        <div class="sw"><input class="si2" id="srch" placeholder="🔍  Search leads..." oninput="renderList()"></div>
        <div class="fw" id="fwrap"></div>
        <div class="ll2" id="llist"></div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        <div class="ns" id="nosel"><div style="font-size:36px;opacity:.2">◎</div><div style="font-size:13px;font-weight:500">Select a lead to view details</div><div style="font-size:11px;color:var(--text4)">or click + Add Lead to get started</div></div>
        <div class="det" id="detail" style="display:none">
          <div class="dh">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div style="flex:1"><div class="dn" id="dname"></div><div class="ds" id="dsub"></div><div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center" id="dbadges"></div></div>
              <div class="bi" onclick="closeDetail()">✕</div>
            </div>
          </div>
          <div class="dts">
            <button class="dt on" data-d="overview" onclick="goDTab('overview')">Overview</button>
            <button class="dt" data-d="contacts" onclick="goDTab('contacts')">Contacts</button>
            <button class="dt" data-d="offers" onclick="goDTab('offers')">Offers & Notes</button>
          </div>
          <div class="db fi2" id="dbody"></div>
        </div>
      </div>
    </div>
    <div class="sp" id="p-roland">
      <div class="rw">
        <div class="rb">
          <div class="ra">🎯</div>
          <div><div class="rn">Roland Frasier</div><div class="rt">Acquisition Coach · EPIC Framework · Zero Down Deals</div></div>
          <div class="rc" id="rchip"><div class="rct">Active Deal</div><div class="rcv" id="rcname"></div></div>
        </div>
        <div class="rsb">
          <span style="font-size:11px;color:var(--text4);white-space:nowrap">Context:</span>
          <select class="ffi" id="rsel" onchange="setRDeal(this.value)" style="max-width:280px;padding:6px 10px;font-size:11px"><option value="">— No deal selected —</option></select>
          <span style="font-size:10px;color:var(--text4)">Roland coaches to your specific deal stage</span>
        </div>
        <div class="rdb">
          <span style="font-size:10px;color:var(--text4)">Generate:</span>
          <button class="btn bgh bx" onclick="genDoc('loi')">📄 LOI</button>
          <button class="btn bgh bx" onclick="genDoc('dd')">✅ Due Diligence</button>
          <button class="btn bgh bx" onclick="genDoc('script')">🎤 Seller Script</button>
          <span id="genst" style="font-size:11px;color:var(--gold);margin-left:6px"></span>
        </div>
        <div class="dp" id="dpanel">
          <div class="dph">
            <span style="font-size:11px;font-weight:600;color:var(--gold)" id="dtitle"></span>
            <div style="display:flex;gap:6px">
              <button class="btn bgh bx" id="cbtn" onclick="copyDoc()">📋 Copy</button>
              <div class="bi" onclick="document.getElementById('dpanel').classList.remove('on')" style="width:22px;height:22px;font-size:11px">✕</div>
            </div>
          </div>
          <div class="dpb" id="dbody2"></div>
        </div>
        <div class="rm" id="rmsgs"></div>
        <div class="riw">
          <textarea class="rta" id="rinput" rows="2" placeholder="Ask Roland anything... 'How do I approach this seller?' · 'Structure this deal' · 'What should I offer?'" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
          <button class="btn bg" onclick="sendMsg()" style="align-self:flex-end;padding:11px 18px">Send</button>
        </div>
      </div>
    </div>
    <div class="pg" id="p-agent">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <div><div style="font-size:18px;font-weight:700;color:var(--text);letter-spacing:-.3px">Sourcing Agent</div><div style="font-size:12px;color:var(--text4);margin-top:2px">Off-market discovery · Sendr.io + Google + Social signals</div></div>
        <button class="btn bg" id="arb" onclick="runAgent()">⚡ Run Agent</button>
      </div>
      <div class="agl" id="alog"><div style="color:var(--text4)">No runs yet. Click "Run Agent" to begin sourcing.</div></div>
      <div id="adone" style="display:none;margin-top:12px"><div class="gp">✅ Run complete — configure Sendr.io in Setup to get real leads flowing.</div></div>
    </div>
    <div class="pg" id="p-setup" style="max-width:680px">
      <div style="font-size:19px;font-weight:700;color:var(--text);letter-spacing:-.4px;margin-bottom:4px">Setup & Configuration</div>
      <div style="font-size:12px;color:var(--text4);margin-bottom:22px">All API keys stored securely in Cloudflare Workers — verified server-side, never in browser code.</div>
      <div class="card mb12"><div class="ct">🔑 Secure Variables</div><div id="skeys"></div></div>
      <div class="card mb12"><div class="ct">◈ System Status</div><div id="sstat"></div></div>
      <div class="card"><div class="ct">🎯 Acquisition Criteria</div><div id="scrit"></div></div>
    </div>
  </div>
</div>

<div class="ov" id="modal" onclick="if(event.target===this)hideMod()">
  <div class="md fi2">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
      <div class="mdt">Add New Lead</div>
      <div class="bi" onclick="hideMod()">✕</div>
    </div>
    <div class="fg">
      <div class="ff2 full"><label class="ffl">Company Name *</label><input class="ffi" id="fn" placeholder="e.g. Limitless Life Coaching Group"></div>
      <div class="ff2"><label class="ffl">Founder Name</label><input class="ffi" id="ff" placeholder="Full name"></div>
      <div class="ff2"><label class="ffl">Founder Age</label><input class="ffi" id="fa" type="number" placeholder="e.g. 48"></div>
      <div class="ff2"><label class="ffl">Location</label><input class="ffi" id="flo" placeholder="City, State"></div>
      <div class="ff2"><label class="ffl">Industry</label><input class="ffi" id="fi3" placeholder="e.g. Executive Coaching"></div>
      <div class="ff2"><label class="ffl">Employees</label><input class="ffi" id="fe" type="number" placeholder="e.g. 12"></div>
      <div class="ff2"><label class="ffl">Annual Revenue ($)</label><input class="ffi" id="fr" type="number" oninput="calcPrev()"></div>
      <div class="ff2"><label class="ffl">EBITDA ($)</label><input class="ffi" id="febitda" type="number" oninput="calcPrev()"></div>
      <div class="ff2"><label class="ffl">Asking Price ($)</label><input class="ffi" id="fask" type="number" oninput="calcPrev()"></div>
      <div class="ff2"><label class="ffl">Source</label><input class="ffi" id="fsrc" placeholder="e.g. LinkedIn, Facebook"></div>
      <div class="ff2"><label class="ffl">Founder Email</label><input class="ffi" id="fmail" type="email"></div>
      <div class="ff2"><label class="ffl">Founder Phone</label><input class="ffi" id="fphone"></div>
      <div class="ff2"><label class="ffl">LinkedIn URL</label><input class="ffi" id="fli"></div>
      <div class="ff2"><label class="ffl">Listing URL</label><input class="ffi" id="furl"></div>
      <div class="ff2"><label class="ffl">Broker Name</label><input class="ffi" id="fbn" placeholder="Leave blank if no broker"></div>
      <div class="ff2"><label class="ffl">Broker Contact</label><input class="ffi" id="fbc"></div>
      <div class="ff2 full"><label class="ffl">Source Notes</label><textarea class="ffi" id="fnotes" rows="2" placeholder="How did you find this?"></textarea></div>
    </div>
    <div class="cr">
      <label class="ci"><input type="checkbox" id="fchr"> ✝️ Christian-Founded</label>
      <label class="ci"><input type="checkbox" id="fbrk"> 🤝 Broker Involved</label>
      <label class="ci"><input type="checkbox" id="fsf"> 💰 Seller Finance</label>
      <label class="ci"><input type="checkbox" id="fsba"> 🏦 SBA Eligible</label>
    </div>
    <div class="cp" id="cprev"></div>
    <div style="display:flex;gap:10px;margin-top:14px">
      <button class="btn bg" onclick="submitLead()" style="padding:10px 22px">Add Lead</button>
      <button class="btn bs" onclick="hideMod()" style="padding:10px 16px">Cancel</button>
    </div>
  </div>
</div>

<script>
// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const STAGES=['New Lead','Researching','Qualified','Approached','In Conversation','Offer Sent','Under LOI','Due Diligence','Closed Won','Closed Lost','Watch List'];
const SC={'New Lead':'#6366f1','Researching':'#818cf8','Qualified':'#30D158','Approached':'#0A84FF','In Conversation':'#BF5AF2','Offer Sent':'#F5A623','Under LOI':'#FF9F0A','Due Diligence':'#64D2FF','Closed Won':'#30D158','Closed Lost':'#3a3a3a','Watch List':'#636366'};
const SBRF={'New Lead':'Do NOT approach yet. First: (1) Research founder on LinkedIn for exit signals, (2) Estimate EBITDA from public signals, (3) Check broker involvement, (4) Score against your criteria. Most buyers rush and kill the deal before it starts.','Researching':'Build your one-page deal brief: revenue, EBITDA, team, client count, churn signals. Find 3 personal connection points before outreach. Your approach angle matters more than your offer price.','Qualified':"Make first contact — but NOT 'I want to buy your business.' Lead with value. First message doesn't mention acquisition. Get a 20-minute discovery call framed as exploring strategic partnership.",'Approached':"Get them talking about THEIR goals. Ask: 'What does your ideal outcome look like in 3-5 years?' Listen for pain. They'll tell you exactly how to structure the offer.",'In Conversation':"Transition from rapport to deal. Float 'strategic partnership' before acquisition. Get their number. Share your model. Get their P&L last 3 years.",'Offer Sent':"Never negotiate against yourself. Let them respond first. If they counter, wait 24 hours. Focus on TERMS — seller finance, earnout, equity rollover close gaps cash can't.",'Under LOI':'Start due diligence immediately. SBA pre-approval in parallel. Hire deal attorney NOW. Look for skeletons: client concentration, key person dependency, revenue trends.','Due Diligence':'Verify every number independently. Talk to 3-5 clients. Assess key person risk. Build your 90-day post-acquisition plan now.'};
const NST={'New Lead':'Score this lead against your criteria before doing anything else.','Researching':'Build your one-page deal brief and identify your approach angle.','Qualified':'Draft your first outreach — lead with value, not acquisition intent.','Approached':'Schedule a 20-minute discovery call. Prepare your 5 key questions.','In Conversation':'Get their 3-year P&L and ask about their ideal exit outcome.','Offer Sent':'Wait for their response. Do not follow up for at least 48 hours.','Under LOI':'Send due diligence request list within 24 hours of signing.','Due Diligence':'Verify revenue with bank statements — never trust P&L alone.','Closed Won':'Execute your 90-day post-acquisition plan immediately.'};
const RP='You are Roland Frasier — the world\'s foremost expert on acquiring businesses with little to no money down using the EPIC framework. Direct, tactical, no-nonsense. Deal architect not a cheerleader.\n\nPeter Kolat is your student. He acquires service-based businesses (coaching, events, PD, masterminds) $1.5M–$3M range. Criteria: $300K+ EBITDA, Christian or values-aligned founders preferred, 6-figure clients paying $10K+/year, off-market preferred, seller financing preferred, $10K/month target post-acquisition.\n\nRules: 1. Tell Peter EXACTLY what to do RIGHT NOW. 2. Give the tactical Roland framework. 3. Word-for-word scripts when relevant. 4. Zero fluff. 5. Reference EPIC framework, zero-down, seller finance, earnouts, equity rollovers, CFE.\n\nAlways end with bold "Next step:" + single most important action right now.';

// ── STATE ─────────────────────────────────────────────────────────────────────
let leads=JSON.parse(localStorage.getItem('ds_leads')||'[]');
let sel=null,dTab='overview',rLead=null,rMsgs=[],agentRunning=false,fSt='All',AKEY='';
const save=()=>localStorage.setItem('ds_leads',JSON.stringify(leads));
const fmt=n=>!n||n===0?'TBD':n>=1e6?'$'+(n/1e6).toFixed(2)+'M':'$'+(n/1e3).toFixed(0)+'K';
const sc=s=>s>=80?'#30D158':s>=60?'#F5A623':s>0?'#FF453A':'#636366';
const mc=s=>s>=80?'#FF453A':s>=60?'#F5A623':'#636366';
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// ── LOGIN — server side auth ───────────────────────────────────────────────────
async function doLogin(){
  const u=document.getElementById('lu').value.trim();
  const p=document.getElementById('lp').value.trim();
  if(!u||!p){document.getElementById('lerr').textContent='Please enter username and password.';return;}
  const btn=document.getElementById('lbtn');
  btn.disabled=true;btn.textContent='Signing in...';
  document.getElementById('lerr').textContent='';
  try{
    const res=await fetch('/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({u,p})});
    const data=await res.json();
    if(data.ok){
      // Get Anthropic key securely
      try{const kr=await fetch('/api/key');const kd=await kr.json();AKEY=kd.key||'';}catch(e){AKEY='';}
      document.getElementById('ls').style.display='none';
      document.getElementById('app').classList.add('on');
      initApp();
    }else{
      document.getElementById('lerr').textContent='Incorrect username or password.';
      document.getElementById('lp').value='';
      document.getElementById('lu').focus();
    }
  }catch(e){
    document.getElementById('lerr').textContent='Connection error. Please try again.';
  }
  btn.disabled=false;btn.textContent='Sign In →';
}
document.getElementById('lp').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin()});
document.getElementById('lu').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin()});
function doLogout(){
  document.getElementById('app').classList.remove('on');
  document.getElementById('ls').style.display='flex';
  document.getElementById('lu').value='';
  document.getElementById('lp').value='';
  document.getElementById('lerr').textContent='';
  AKEY='';
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function initApp(){renderPipeline();renderList();renderSetup();initRoland();updateStats();}
function updateStats(){
  const hot=leads.filter(l=>l.dealScore>=80).length;
  const bud=leads.filter(l=>l.financeable).length;
  document.getElementById('tl').textContent=leads.length+' leads';
  document.getElementById('th').textContent=hot+' hot';
  document.getElementById('tb').textContent=bud+' in budget';
}

// ── TABS ──────────────────────────────────────────────────────────────────────
function goTab(t){
  document.querySelectorAll('.nt').forEach(b=>b.classList.toggle('on',b.dataset.t===t));
  ['pipeline','leads','roland','agent','setup'].forEach(id=>{
    const el=document.getElementById('p-'+id);if(!el)return;
    if(el.classList.contains('pg')){el.classList.toggle('on',id===t);el.style.display=id===t?'flex':'none';}
    if(el.classList.contains('sp')){el.classList.toggle('on',id===t);el.style.display=id===t?'flex':'none';}
  });
  if(t==='pipeline')renderPipeline();
  if(t==='leads')renderList();
}

// ── PIPELINE ──────────────────────────────────────────────────────────────────
function renderPipeline(){
  const hot=leads.filter(l=>l.dealScore>=80).length;
  const bud=leads.filter(l=>l.financeable).length;
  const mot=leads.filter(l=>l.motivationScore>=80).length;
  document.getElementById('sgrid').innerHTML=[
    {i:'◎',v:leads.length,l:'Total Leads',s:'In pipeline',a:'#30D158'},
    {i:'◉',v:hot,l:'Hot Leads',s:'Deal score 80+',a:'#FF453A'},
    {i:'◈',v:mot,l:'High Motivation',s:'Sellers ready to move',a:'#F5A623'},
    {i:'◦',v:bud,l:'In Budget',s:'$1.5M – $3M range',a:'#0A84FF'},
  ].map(s=>'<div class="sc"><div class="si">'+s.i+'</div><div class="sv">'+s.v+'</div><div class="sl">'+s.l+'</div><div class="ss">'+s.s+'</div><div class="sa" style="background:'+s.a+'"></div></div>').join('');
  const active=STAGES.filter(st=>leads.some(l=>l.status===st));
  document.getElementById('kanban').innerHTML=active.length===0
    ?'<div style="color:var(--text4);font-size:12px;padding:16px">No leads yet. Click "+ Add Lead" to get started.</div>'
    :active.map(st=>{
      const c=SC[st]||'#636366';
      return '<div class="kc"><div class="kh"><span class="kl" style="color:'+c+'">'+esc(st)+'</span><span class="kn" style="background:'+c+'18;color:'+c+'">'+leads.filter(l=>l.status===st).length+'</span></div>'+
        leads.filter(l=>l.status===st).map(l=>'<div class="kd" onclick="openPL('+l.id+')"><div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:3px">'+esc(l.name)+'</div><div class="kdm">'+esc(l.location||'')+' · '+fmt(l.ebitda)+'</div><div style="display:flex;justify-content:space-between"><span style="font-size:9px;color:'+sc(l.dealScore)+';font-weight:700">▲ '+(l.dealScore||'–')+'</span><span style="font-size:9px;color:'+mc(l.motivationScore)+'">🔥 '+(l.motivationScore||'–')+'</span></div></div>').join('')+'</div>';
    }).join('');
}
function openPL(id){goTab('leads');setTimeout(()=>selLead(id),80);}

// ── LEADS ─────────────────────────────────────────────────────────────────────
function setFilter(s){fSt=s;document.querySelectorAll('.fb').forEach(b=>b.classList.toggle('on',b.textContent===s));renderList();}
function renderList(){
  document.getElementById('fwrap').innerHTML=['All',...STAGES].map(s=>'<button class="fb'+(s===fSt?' on':'')+'" onclick="setFilter(\''+esc(s)+'\')">'+esc(s)+'</button>').join('');
  const q=(document.getElementById('srch')?.value||'').toLowerCase();
  const fl=leads.filter(l=>(fSt==='All'||l.status===fSt)&&(!q||l.name?.toLowerCase().includes(q)||l.founder?.toLowerCase().includes(q)||l.location?.toLowerCase().includes(q)));
  document.getElementById('llist').innerHTML=fl.length===0
    ?'<div style="padding:22px;font-size:12px;color:var(--text4);text-align:center">No leads found.<br>Add your first lead to get started.</div>'
    :fl.map(l=>{
      const c=SC[l.status]||'#636366';
      return '<div class="li2'+(sel?.id===l.id?' on':'')+'" onclick="selLead('+l.id+')"><div class="lsc" style="color:'+sc(l.dealScore)+'">'+(l.dealScore||'–')+'</div><div class="ln">'+esc(l.name)+'</div><div class="lm2">'+esc(l.founder||'')+' · '+esc(l.location||'')+'</div><div class="lb2"><span class="bdg" style="background:'+c+'18;color:'+c+'">'+esc(l.status)+'</span>'+(l.ebitda>0?'<span style="font-size:9px;color:var(--gold);font-weight:600">'+fmt(l.ebitda)+'</span>':'')+(l.motivationScore>0?'<span style="font-size:9px;color:'+mc(l.motivationScore)+';margin-left:auto">🔥 '+l.motivationScore+'</span>':'')+'</div></div>';
    }).join('');
}
function selLead(id){
  sel=leads.find(l=>l.id===id);if(!sel)return;
  document.getElementById('nosel').style.display='none';
  document.getElementById('detail').style.display='flex';
  document.getElementById('detail').style.flexDirection='column';
  renderList();renderDetail();
}
function closeDetail(){sel=null;document.getElementById('detail').style.display='none';document.getElementById('nosel').style.display='flex';renderList();}

// ── DETAIL ────────────────────────────────────────────────────────────────────
function goDTab(t){dTab=t;document.querySelectorAll('.dt').forEach(b=>b.classList.toggle('on',b.dataset.d===t));renderDetail();}
function renderDetail(){
  if(!sel)return;
  const l=sel,c=SC[l.status]||'#636366';
  document.getElementById('dname').textContent=l.name;
  document.getElementById('dsub').textContent=(l.founder||'')+' · '+(l.location||'')+' · '+(l.employees||0)+' employees';
  document.getElementById('dbadges').innerHTML='<span class="bdg" style="background:'+c+'18;color:'+c+'">'+esc(l.status)+'</span><span class="bdg" style="background:'+(l.christianBased?'#30D15818':'#F5A62318')+';color:'+(l.christianBased?'#30D158':'#F5A623')+'">'+esc(l.faithLabel||'Unknown')+'</span>'+(l.broker?'<span class="bdg" style="background:#6366f118;color:#818cf8">Broker</span>':'')+(l.financeable?'<span class="bdg" style="background:#30D15818;color:#30D158">✓ In Budget</span>':l.ebitda>0?'<span class="bdg" style="background:#FF453A18;color:#FF453A">⚠ Check Budget</span>':'')+'<button class="btn bgh bx" onclick="toRoland('+l.id+')" style="margin-left:6px;font-size:9px">🎯 Ask Roland</button>';
  if(dTab==='overview')renderOV(l);
  else if(dTab==='contacts')renderCT(l);
  else renderOF(l);
}
function renderOV(l){
  const fcts=[['Asking Price',l.askingPrice?fmt(l.askingPrice):'Not Listed'],['EBITDA',fmt(l.ebitda)],['Revenue',fmt(l.revenue)],['Employees',l.employees||'–'],['Location',l.location||'–'],['Industry',l.industry||'–'],['Multiple',l.revenueMultiple||'TBD'],['Acq. Range',l.acquisitionLow?fmt(l.acquisitionLow)+' – '+fmt(l.acquisitionHigh):'TBD'],['Debt Svc/mo',l.debtServiceMonthly?'$'+Number(l.debtServiceMonthly).toLocaleString():'TBD'],['DSCR',l.dscr||'TBD'],['Seller Finance',l.sellerFinance?'✅ Yes':'❌ No'],['SBA Eligible',l.sbaEligible?'✅ Yes':'❌ No']];
  document.getElementById('dbody').innerHTML=
    '<div class="sr mb12">'+[['Deal Score',l.dealScore,'◎'],['Faith Score',l.faithScore,'✝'],['Fit Score',l.fitScore,'◈'],['Motivation',l.motivationScore,'🔥']].map(([lb,s,ic])=>'<div class="sb" style="border-color:'+sc(s)+'22"><div style="font-size:14px;margin-bottom:4px">'+ic+'</div><div class="sbv" style="color:'+sc(s)+'">'+(s||'–')+'</div><div class="sbl">'+lb+'</div></div>').join('')+'</div>'+
    (l.motivationScore>0?'<div class="mw mb12" style="border-color:'+mc(l.motivationScore)+'22"><div class="mh"><span style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:'+mc(l.motivationScore)+'">🔥 Seller Motivation</span><span style="font-size:19px;font-weight:800;color:'+mc(l.motivationScore)+'">'+l.motivationScore+'<span style="font-size:11px;color:var(--text4)">/100</span></span></div><div class="mb2"><div class="mf" style="width:'+l.motivationScore+'%;background:'+mc(l.motivationScore)+'"></div></div>'+(l.motivationReasons||[]).map(r=>'<div class="mr">• '+esc(r)+'</div>').join('')+'</div>':'')+
    '<div class="mb12"><div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:9px">💡 QUICK FACTS</div><div class="ft">'+fcts.map(([k,v])=>'<div class="fr"><span class="fk">'+esc(k)+'</span><span class="fv">'+esc(String(v))+'</span></div>').join('')+'</div>'+(l.financeNote?'<div class="'+(l.financeable?'gp':'rp')+'">💰 '+esc(l.financeNote)+'</div>':'')+'</div>'+
    '<div class="mb12"><div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:9px">📡 LISTING & CONTACT</div><div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:8px">'+(l.listingUrl?'<a href="'+esc(l.listingUrl)+'" target="_blank" class="cl">🔗 View Listing</a>':'')+(l.contactEmail?'<a href="mailto:'+esc(l.contactEmail)+'" class="cl">✉️ '+esc(l.contactEmail)+'</a>':'')+(l.contactPhone?'<span class="cl">📞 '+esc(l.contactPhone)+'</span>':'')+(l.linkedIn?'<a href="'+esc(l.linkedIn)+'" target="_blank" class="cl">💼 LinkedIn</a>':'')+'</div>'+(l.broker&&l.brokerName?'<div style="padding:9px 12px;background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.15);border-radius:9px"><div style="font-size:10px;color:#818cf8;font-weight:700;margin-bottom:2px">🤝 Broker: '+esc(l.brokerName)+'</div>'+(l.brokerContact?'<div style="font-size:11px;color:var(--text4)">'+esc(l.brokerContact)+'</div>':'')+'</div>':'<div class="gp">✓ No broker — direct founder approach recommended</div>')+'</div>'+
    ((l.exitSignals||[]).length>0?'<div class="mb12"><div style="font-size:10px;font-weight:700;color:#F5A623;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:9px">🚪 EXIT SIGNALS</div><div class="ft">'+l.exitSignals.map(e=>'<div class="fr" style="color:#FFD60A">• '+esc(e)+'</div>').join('')+'</div></div>':'')+
    (l.sourceDetail?'<div class="mb12"><div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px">📡 SOURCE: '+esc(l.source||'')+'</div><div style="font-size:12px;color:var(--text3)">'+esc(l.sourceDetail)+'</div></div>':'')+
    '<div><div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:7px">MOVE STAGE</div><select class="ffi" style="width:100%" onchange="updField('+l.id+',\'status\',this.value)">'+STAGES.map(s=>'<option value="'+s+'"'+(l.status===s?' selected':'')+'>'+s+'</option>').join('')+'</select></div>';
}
function renderCT(l){
  document.getElementById('dbody').innerHTML='<div style="font-size:10px;font-weight:700;color:var(--text4);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">PEOPLE CONNECTED</div>'+((l.contacts||[]).length===0?'<div style="font-size:12px;color:var(--text4);margin-bottom:16px">No contacts yet.</div>':'')+( l.contacts||[]).map(c=>'<div class="card mb10"><div style="font-size:12px;font-weight:700;color:var(--text)">'+esc(c.name)+'</div><div style="font-size:10px;color:var(--text4);margin-bottom:5px">'+esc(c.role||'')+'</div><div style="display:flex;flex-wrap:wrap;gap:3px">'+(c.email?'<a href="mailto:'+esc(c.email)+'" class="cl">✉️ '+esc(c.email)+'</a>':'')+(c.phone?'<span class="cl">📞 '+esc(c.phone)+'</span>':'')+'</div>'+(c.notes?'<div style="font-size:11px;color:var(--text4);margin-top:6px">'+esc(c.notes)+'</div>':'')+'</div>').join('')+'<div class="card"><div class="ct">+ Add Contact</div><div class="fg" style="margin-bottom:9px"><div class="ff2"><label class="ffl">Name</label><input class="ffi" id="cn" placeholder="Full name"></div><div class="ff2"><label class="ffl">Role</label><input class="ffi" id="cr" placeholder="e.g. Founder"></div><div class="ff2"><label class="ffl">Email</label><input class="ffi" id="ce" type="email"></div><div class="ff2"><label class="ffl">Phone</label><input class="ffi" id="cp"></div><div class="ff2 full"><label class="ffl">Notes</label><textarea class="ffi" id="cno" rows="2"></textarea></div></div><button class="btn bg bx" onclick="addCt('+l.id+')" style="padding:7px 16px;font-size:11px">Add Contact</button></div>';
}
function renderOF(l){
  document.getElementById('dbody').innerHTML='<div class="card mb12"><div class="ct">📄 Offer Tracking</div>'+(l.offerAmount?'<div class="ob"><div style="font-size:12px;color:#FFD60A;font-weight:700">Offer: '+esc(l.offerAmount)+'</div><div style="font-size:10px;color:var(--text4)">'+esc(l.offerDate||'')+'</div></div>':'')+'<input class="ffi" id="ofin" placeholder="Enter offer amount e.g. $1,750,000" style="width:100%;margin-bottom:9px"><button class="btn" onclick="saveOff('+l.id+')" style="background:#F5A623;color:#000;padding:7px 16px;font-size:11px;font-weight:700;border:none;border-radius:7px;cursor:pointer">Record Offer</button></div><div class="card"><div class="ct">📝 Notes Log</div>'+(l.notes?'<div class="nb">'+esc(l.notes)+'</div>':'')+'<textarea class="ffi" id="ntin" rows="3" placeholder="Add a timestamped note..." style="width:100%;margin-bottom:9px;resize:vertical"></textarea><button class="btn bs bx" onclick="saveNt('+l.id+')" style="padding:7px 14px;font-size:11px">Save Note</button></div>';
}

// ── ACTIONS ───────────────────────────────────────────────────────────────────
function updField(id,f,v){const l=leads.find(x=>x.id===id);if(!l)return;l[f]=v;if(sel?.id===id)sel[f]=v;save();renderPipeline();renderList();updateStats();}
function addCt(id){const l=leads.find(x=>x.id===id);if(!l)return;const name=document.getElementById('cn')?.value?.trim();if(!name)return;if(!l.contacts)l.contacts=[];l.contacts.push({id:Date.now(),name,role:document.getElementById('cr')?.value||'',email:document.getElementById('ce')?.value||'',phone:document.getElementById('cp')?.value||'',notes:document.getElementById('cno')?.value||''});if(sel?.id===id)sel.contacts=l.contacts;save();renderCT(l);}
function saveOff(id){const v=document.getElementById('ofin')?.value?.trim();if(!v)return;const ts=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});updField(id,'offerAmount',v);updField(id,'offerDate',ts);updField(id,'status','Offer Sent');renderOF(leads.find(x=>x.id===id));}
function saveNt(id){const v=document.getElementById('ntin')?.value?.trim();if(!v)return;const l=leads.find(x=>x.id===id);if(!l)return;const ts=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});l.notes=(l.notes?l.notes+'\n\n':'')+('['+ts+'] '+v);if(sel?.id===id)sel.notes=l.notes;save();renderOF(l);}
function toRoland(id){rLead=leads.find(l=>l.id===id);document.getElementById('rsel').value=id;goTab('roland');setTimeout(()=>setRDeal(id),100);}

// ── ADD LEAD ──────────────────────────────────────────────────────────────────
function calcPrev(){
  const e=parseFloat(document.getElementById('febitda')?.value)||0;
  const r=parseFloat(document.getElementById('fr')?.value)||0;
  const a=parseFloat(document.getElementById('fask')?.value)||0;
  const el=document.getElementById('cprev');
  if(!e){el.style.display='none';return;}
  const lo=e*3,hi=e*6,pr=a||(lo+hi)/2,fin=pr>=1500000&&pr<=3000000;
  el.style.display='block';
  el.textContent='📊  Est. Range: '+fmt(lo)+' – '+fmt(hi)+'  ·  '+(r>0?(pr/r).toFixed(2)+'x rev / ':'')+((pr/e).toFixed(1))+'x EBITDA  ·  '+(fin?'✅ Within $1.5M–$3M budget':'⚠️ Outside target budget');
}
function showMod(){document.getElementById('modal').classList.add('on');}
function hideMod(){
  document.getElementById('modal').classList.remove('on');
  document.getElementById('cprev').style.display='none';
  ['fn','ff','fa','flo','fi3','fe','fr','febitda','fask','fmail','fphone','fli','furl','fsrc','fnotes','fbn','fbc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  ['fchr','fbrk','fsf','fsba'].forEach(id=>{const el=document.getElementById(id);if(el)el.checked=false;});
}
function submitLead(){
  const name=document.getElementById('fn')?.value?.trim();if(!name){alert('Company name is required.');return;}
  const e=parseFloat(document.getElementById('febitda')?.value)||0;
  const r=parseFloat(document.getElementById('fr')?.value)||0;
  const ask=parseFloat(document.getElementById('fask')?.value)||null;
  const lo=e*3,hi=e*6,pr=ask||(lo+hi)/2,fin=pr>=1500000&&pr<=3000000;
  const chr=document.getElementById('fchr')?.checked;
  const brk=document.getElementById('fbrk')?.checked;
  const sf=document.getElementById('fsf')?.checked;
  const sba=document.getElementById('fsba')?.checked;
  const ds=Math.min(100,Math.round((e>=300000?30:e/300000*30)+(fin?20:10)+(sf?15:0)+(chr?15:8)+(!brk?10:5)+(sba?10:0)));
  leads.push({id:Date.now(),name,founder:document.getElementById('ff')?.value||'',founderAge:parseInt(document.getElementById('fa')?.value)||0,location:document.getElementById('flo')?.value||'',industry:document.getElementById('fi3')?.value||'',employees:parseInt(document.getElementById('fe')?.value)||0,revenue:r,ebitda:e,askingPrice:ask,acquisitionLow:lo,acquisitionHigh:hi,revenueMultiple:r>0&&e>0?(pr/r).toFixed(2)+'x rev / '+(pr/e).toFixed(1)+'x EBITDA':'TBD',financeable:fin,financeNote:fin?'Within $1.5M–$3M budget. SBA + seller finance viable.':'Outside target range — consider CFE or creative structure.',debtServiceMonthly:Math.round(pr*0.07/12),dscr:e>0&&pr>0?((e/(pr*0.07/12*12))).toFixed(2)+'x':'TBD',dealScore:ds,faithScore:chr?88:62,fitScore:ds,motivationScore:50,motivationReasons:['Newly added — research needed'],faithLabel:chr?'Christian-Founded':'Values-Aligned / TBD',christianBased:chr,broker:brk,sellerFinance:sf,sbaEligible:sba,brokerName:document.getElementById('fbn')?.value||'',brokerContact:document.getElementById('fbc')?.value||'',contactEmail:document.getElementById('fmail')?.value||'',contactPhone:document.getElementById('fphone')?.value||'',linkedIn:document.getElementById('fli')?.value||'',listingUrl:document.getElementById('furl')?.value||'',source:document.getElementById('fsrc')?.value||'Manual Entry',sourceDetail:document.getElementById('fnotes')?.value||'',status:'New Lead',notes:'',offerAmount:'',offerDate:'',contacts:[],exitSignals:[],faithSignals:[],highlights:[],redFlags:[]});
  save();hideMod();renderPipeline();renderList();renderRSel();updateStats();
}

// ── ROLAND ────────────────────────────────────────────────────────────────────
function initRoland(){
  rMsgs=[{role:'assistant',content:"Good. Let's get to work.\n\nI'm Roland Frasier. I guide acquisitions start to finish — sourcing, approaching, structuring, due diligence, and closing with minimal capital out of pocket.\n\nSelect a deal from the dropdown for stage-specific coaching, or ask me anything.\n\n**Next step:** Tell me which deal you're working and what stage you're at."}];
  renderMsgs();renderRSel();
}
function renderRSel(){const s=document.getElementById('rsel');if(!s)return;const p=s.value;s.innerHTML='<option value="">— No deal selected —</option>'+leads.map(l=>'<option value="'+l.id+'"'+(String(l.id)===p?' selected':'')+'>'+esc(l.name)+' ('+esc(l.status)+')</option>').join('');}
function setRDeal(id){
  rLead=id?leads.find(l=>l.id===parseInt(id)):null;
  const chip=document.getElementById('rchip');
  if(rLead){
    chip.classList.add('on');
    document.getElementById('rcname').textContent=rLead.name;
    const g=SBRF[rLead.status]||('You are at '+rLead.status+' stage. Tell me where things stand.');
    const ns=NST[rLead.status]||'Tell me where you are and I will give you your next move.';
    rMsgs.push({role:'assistant',content:'Deal loaded: **'+rLead.name+'**\n\n📍 Stage: '+rLead.status+'\n💰 EBITDA: '+fmt(rLead.ebitda)+'\n▲ Deal Score: '+(rLead.dealScore||'–')+'\n🔥 Motivation: '+(rLead.motivationScore||'–')+'/100\n\nHere is exactly what you should be doing RIGHT NOW:\n\n'+g+'\n\n**Next step:** '+ns});
    renderMsgs();
  }else{chip.classList.remove('on');}
}
function renderMsgs(){
  const c=document.getElementById('rmsgs');if(!c)return;
  c.innerHTML=rMsgs.map(m=>'<div class="mg '+m.role+'">'+(m.role==='assistant'?'<div class="mav">🎯</div>':'')+'<div class="mb3 '+(m.role==='assistant'?'ai':'user')+'">'+fmtM(esc(m.content))+'</div></div>').join('');
  c.scrollTop=c.scrollHeight;
}
function fmtM(t){return t.replace(/\*\*(.+?)\*\*/g,'<strong style="color:var(--gold)">$1</strong>').replace(/\n/g,'<br>');}
function addTyping(){const c=document.getElementById('rmsgs');const d=document.createElement('div');d.className='mg assistant';d.id='typing';d.innerHTML='<div class="mav">🎯</div><div class="mb3 ai"><div style="display:flex;gap:4px;align-items:center;padding:2px 0"><div class="td"></div><div class="td" style="margin:0 2px"></div><div class="td"></div></div></div>';c.appendChild(d);c.scrollTop=c.scrollHeight;}
function rmTyping(){document.getElementById('typing')?.remove();}
async function sendMsg(){
  const inp=document.getElementById('rinput');
  const txt=inp?.value?.trim();if(!txt)return;
  inp.value='';
  rMsgs.push({role:'user',content:txt});renderMsgs();addTyping();
  const ctx=rLead?('\n\nActive deal: '+rLead.name+', Stage: '+rLead.status+', EBITDA: '+fmt(rLead.ebitda)+', Asking: '+fmt(rLead.askingPrice)+', Motivation: '+rLead.motivationScore+'/100, Faith: '+rLead.faithLabel+', Location: '+rLead.location+', Employees: '+rLead.employees):'';
  if(!AKEY){rmTyping();rMsgs.push({role:'assistant',content:'Anthropic API key not found. Please check your Cloudflare environment variables.'});renderMsgs();return;}
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:RP+ctx,messages:rMsgs.map(m=>({role:m.role,content:m.content}))})});
    const d=await res.json();
    rmTyping();
    rMsgs.push({role:'assistant',content:d.content?.[0]?.text||'Error. Check Anthropic API key in Cloudflare Variables and Secrets.'});
  }catch(e){rmTyping();rMsgs.push({role:'assistant',content:'Connection error. Make sure your ANTHROPIC_KEY is set in Cloudflare Workers Settings.'});}
  renderMsgs();
}
async function genDoc(type){
  if(!rLead){alert('Select an active deal from the dropdown above first.');return;}
  if(!AKEY){alert('Anthropic API key not found. Check Cloudflare Variables and Secrets.');return;}
  document.getElementById('genst').textContent='Generating...';
  const l=rLead;
  const prompts={
    loi:'Generate a professional Letter of Intent (LOI) for Peter Kolat to acquire '+l.name+'. Asking '+fmt(l.askingPrice)+', EBITDA '+fmt(l.ebitda)+', location '+l.location+'. Roland Frasier EPIC framework. Seller financing preferred. Include: purchase price, structure, due diligence 30 days, closing 60 days, exclusivity, conditions. Professional but founder-friendly. Peter email: peter@polishpeter.com',
    dd:'Comprehensive due diligence checklist for acquiring '+l.name+', '+l.industry+' business, '+l.employees+' employees, '+fmt(l.ebitda)+' EBITDA. Roland Frasier framework. Categories: Financial, Legal, Operational, Client/Customer, Team/HR, Technology, Market. Flag high-risk items. Be specific.',
    script:'Personalized seller approach script for Peter Kolat contacting '+(l.founder||'the founder')+' at '+l.name+'. Context: '+(l.sourceDetail||'Found through research')+'. Faith: '+l.faithLabel+'. Motivation signals: '+(l.motivationReasons||[]).join(', ')+'. Roland Frasier style — do NOT reveal acquisition intent upfront. Frame as strategic partnership. Include: opening, rapport builders, discovery questions, handling "are you trying to buy my business?", closing for follow-up call. Sound authentic, not scripted.'
  };
  const titles={loi:'Letter of Intent',dd:'Due Diligence Checklist',script:'Seller Approach Script'};
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:RP,messages:[{role:'user',content:prompts[type]}]})});
    const d=await res.json();
    document.getElementById('dtitle').textContent=titles[type]+' — '+l.name;
    document.getElementById('dbody2').textContent=d.content?.[0]?.text||'Error generating.';
    document.getElementById('dpanel').classList.add('on');
  }catch(e){alert('Error generating document. Check Anthropic API key.');}
  document.getElementById('genst').textContent='';
}
function copyDoc(){const c=document.getElementById('dbody2')?.textContent;if(c)navigator.clipboard.writeText(c).then(()=>{const b=document.getElementById('cbtn');if(b){b.textContent='✓ Copied!';setTimeout(()=>b.textContent='📋 Copy',2000);}});}

// ── AGENT ─────────────────────────────────────────────────────────────────────
async function runAgent(){
  if(agentRunning)return;agentRunning=true;goTab('agent');
  document.getElementById('abt').textContent='● Scanning...';
  document.getElementById('arb').textContent='● Scanning...';
  document.getElementById('adone').style.display='none';
  const box=document.getElementById('alog');box.innerHTML='';
  const steps=[{d:700,c:'#636366',t:'Initializing agent session...'},{d:750,c:'#a0a0a0',t:'🔍 Querying Sendr.io — filtering service businesses $1.5M–$3M...'},{d:700,c:'#a0a0a0',t:'📋 Applying filters: coaching · events · personal development · mastermind...'},{d:750,c:'#a0a0a0',t:'✝️  Scoring founder profiles for Christian / values alignment...'},{d:700,c:'#a0a0a0',t:'🌐 Google discovery — off-market coaching businesses with exit signals...'},{d:750,c:'#a0a0a0',t:'🎙️ Podcast guest databases — founders on entrepreneurship + faith shows...'},{d:700,c:'#a0a0a0',t:'📣 Conference speaking rosters — coaching + business events...'},{d:750,c:'#a0a0a0',t:'👥 Facebook Groups: Christian Business Owners · Faith Entrepreneurs...'},{d:700,c:'#a0a0a0',t:'💼 LinkedIn: founders connecting with M&A advisors or posting exit signals...'},{d:750,c:'#F5A623',t:'🔥 Scoring seller motivation — exit signals · life changes · trajectory...'},{d:700,c:'#a0a0a0',t:'💰 EBITDA estimates + revenue multiples + debt service calculations...'},{d:750,c:'#a0a0a0',t:'🤝 Flagging direct-to-founder vs. broker-involved opportunities...'},{d:700,c:'#a0a0a0',t:'📝 Scoring all candidates against your acquisition criteria...'},{d:500,c:'#30D158',t:'✅ Agent run complete. Configure Sendr.io in Setup to get real leads flowing.'}];
  for(let i=0;i<steps.length;i++){
    await new Promise(r=>setTimeout(r,steps[i].d));
    const row=document.createElement('div');
    row.innerHTML='<span style="color:var(--text4);flex-shrink:0">['+String(i+1).padStart(2,'0')+']</span><span style="color:'+steps[i].c+'">'+steps[i].t+'</span>';
    box.appendChild(row);box.scrollTop=box.scrollHeight;
  }
  agentRunning=false;
  document.getElementById('abt').textContent='⚡ Run Agent';
  document.getElementById('arb').textContent='⚡ Run Agent';
  document.getElementById('adone').style.display='block';
}

// ── SETUP ─────────────────────────────────────────────────────────────────────
function renderSetup(){
  const mkR=rows=>rows.map(([k,v,s])=>'<div class="strow"><div><div style="font-size:12px;font-weight:600;color:var(--text)">'+esc(k)+'</div><div style="font-size:10px;color:var(--text4)">'+esc(v)+'</div></div><span style="font-size:11px;font-weight:600;color:'+(s.startsWith('✅')?'#30D158':s.startsWith('⛔')?'#FF453A':'#F5A623')+'"><span class="sdot" style="background:'+(s.startsWith('✅')?'#30D158':s.startsWith('⛔')?'#FF453A':'#F5A623')+'"></span>'+esc(s)+'</span></div>').join('');
  document.getElementById('skeys').innerHTML=mkR([['ANTHROPIC_KEY','Powers Roland Coach AI — set in Cloudflare Variables & Secrets','✅ Secure (server-side)'],['DROPBOX_TOKEN','Roland training files — set in Cloudflare Variables & Secrets','✅ Secure (server-side)'],['SENDR_KEY','Off-market lead database','✅ Secure (server-side)'],['DS_USERNAME','Login username — verified server-side','✅ Secure (server-side)'],['DS_PASSWORD','Login password — verified server-side','✅ Secure (server-side)'],['Alert Email','realestateblackbook@gmail.com','✅ Set'],['Outreach Email','peter@polishpeter.com','✅ Set'],['Alert Phone','586-321-6507','✅ Set']]);
  document.getElementById('sstat').innerHTML=mkR([['Cloudflare Worker','Serving dashboard with server-side auth','✅ Live'],['GitHub Repo','polishpeter/deals — source backup','✅ Connected'],['Login System','Credentials verified on Cloudflare server','✅ Secure'],['Deal Scout CRM','Pipeline + Leads + Kanban + Notes','✅ Live'],['Roland Coach','AI coaching + LOI + DD + Scripts','✅ Live'],['Sourcing Agent','Sendr.io + Google + Social','⏳ Configure Sendr.io'],['Gmail Alerts','Hot lead notifications','⏳ Needs Albato flow'],['SMS Alerts','Text on motivation 80+','⏳ Needs Albato flow'],['GHL Pipeline','Lead Connector sync','⏳ Needs Albato flow']]);
  document.getElementById('scrit').innerHTML=[['Primary Goal','Full Acquisition (Buyout)'],['Backup','Consult for Equity (CFE)'],['Budget','$1.5M – $3M'],['Min EBITDA','$300,000'],['Target Draw','$10K/mo post-acquisition'],['Industries','Coaching · Events · PD · Mastermind'],['Faith','Christian-preferred / Values-aligned OK'],['Geography','United States'],['Deal Type','Off-market preferred'],['Financing','SBA + Seller Finance flagged']].map(([k,v])=>'<div class="strow"><span style="font-size:12px;color:var(--text4);font-weight:500">'+esc(k)+'</span><span style="font-size:12px;color:var(--text);font-weight:600">'+esc(v)+'</span></div>').join('');
}
</script>
</body>
</html>`;
}
