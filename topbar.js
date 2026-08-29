/* ============================================================
   topbar.js — SmartLearn AI
   Handles: Dark Mode, Notifications, User Dropdown
   Connect: <script src="topbar.js"></script> before </body>
============================================================ */

(function () {

  /* ─────────────────────────────────────────
     INJECT TOPBAR STYLES
  ───────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `

    /* ── DARK MODE ── */
    body.dark {
      background: #0f172a !important;
      color: #e2e8f0 !important;
    }

    body.dark .sidebar {
      background: #1e293b !important;
      border-color: #334155 !important;
    }

    body.dark .sidebar-logo span { color: #f1f5f9 !important; }

    body.dark .sidebar-nav a {
      color: #94a3b8 !important;
    }

    body.dark .sidebar-nav a:hover {
      background: #1e3a5f !important;
      color: #818cf8 !important;
    }

    body.dark .sidebar-nav a.active {
      background: #1e3a5f !important;
      color: #818cf8 !important;
    }

    body.dark .topbar {
      background: #1e293b !important;
      border-color: #334155 !important;
    }

    body.dark .topbar-left,
    body.dark .topbar-left span,
    body.dark .topbar-left strong { color: #e2e8f0 !important; }

    body.dark .icon-btn {
      background: #1e293b !important;
      border-color: #334155 !important;
      color: #94a3b8 !important;
    }

    body.dark .icon-btn:hover {
      background: #1e3a5f !important;
      color: #818cf8 !important;
    }

    body.dark .icon-btn.active-theme {
      background: #1e3a5f !important;
      border-color: #818cf8 !important;
      color: #818cf8 !important;
    }

    body.dark .user { color: #e2e8f0 !important; }

    body.dark .card,
    body.dark .explanation-card,
    body.dark .example-card,
    body.dark .quiz-card,
    body.dark .ai-card,
    body.dark .main-card,
    body.dark .cert-card,
    body.dark .stat-card,
    body.dark .course-row,
    body.dark .progress-card {
      background: #1e293b !important;
      border-color: #334155 !important;
    }

    body.dark .card h3,
    body.dark .card h4,
    body.dark .cert-card-title,
    body.dark .card-title { color: #f1f5f9 !important; }

    body.dark .welcome h1,
    body.dark .page-heading h1,
    body.dark .cert-heading h1 { color: #f1f5f9 !important; }

    body.dark .muted,
    body.dark .welcome p,
    body.dark .page-heading p,
    body.dark .cert-heading p { color: #64748b !important; }

    body.dark .course-item,
    body.dark .course-row { background: #1e293b !important; border-color: #334155 !important; }

    body.dark .option { background: #1e293b !important; border-color: #334155 !important; color: #94a3b8 !important; }
    body.dark .option:hover { background: #1e3a5f !important; border-color: #818cf8 !important; }
    body.dark .option.active { background: #1e3a5f !important; border-color: #818cf8 !important; color: #e2e8f0 !important; }

    body.dark .chat-input input,
    body.dark .ai-input input,
    body.dark #chatInput {
      background: #1e293b !important;
      border-color: #334155 !important;
      color: #e2e8f0 !important;
    }

    body.dark .bubble.ai, body.dark .message.ai .bubble { background: #1e293b !important; color: #e2e8f0 !important; }

    body.dark .course-item { background: #1e293b !important; border-color: #334155 !important; color: #94a3b8 !important; }
    body.dark .course-item.active { background: #1e3a5f !important; color: #818cf8 !important; }

    body.dark .progress-bar { background: #334155 !important; }

    body.dark .main { background: #0f172a !important; }

    body.dark .stat-info strong,
    body.dark .stat-value { color: #f1f5f9 !important; }

    /* ── THEME TRANSITION ── */
    body, .sidebar, .topbar, .card, .icon-btn, .option, .chat-input input {
      transition: background 0.25s ease, border-color 0.25s ease, color 0.15s ease !important;
    }

    /* ── NOTIFICATION DROPDOWN ── */
    .notif-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 340px;
      background: #ffffff;
      border-radius: 18px;
      border: 1px solid #eef2ff;
      box-shadow: 0 20px 60px rgba(79,110,247,0.15), 0 4px 16px rgba(0,0,0,0.06);
      z-index: 999;
      overflow: hidden;
      transform: translateY(-8px) scale(0.97);
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.34,1.4,0.64,1);
    }

    body.dark .notif-dropdown {
      background: #1e293b !important;
      border-color: #334155 !important;
    }

    .notif-dropdown.open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    .notif-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px 12px;
      border-bottom: 1px solid #f1f5f9;
    }

    body.dark .notif-header { border-color: #334155 !important; }

    .notif-header h4 {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    body.dark .notif-header h4 { color: #f1f5f9 !important; }

    .notif-mark-all {
      font-size: 12px;
      color: #4f6ef7;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
      font-family: 'Inter', sans-serif;
      padding: 0;
    }

    .notif-mark-all:hover { text-decoration: underline; }

    .notif-list { max-height: 320px; overflow-y: auto; }

    .notif-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 13px 18px;
      border-bottom: 1px solid #f8fafc;
      cursor: pointer;
      transition: background 0.15s;
      position: relative;
    }

    body.dark .notif-item { border-color: #334155 !important; }

    .notif-item:hover { background: #f5f7ff; }
    body.dark .notif-item:hover { background: #1e3a5f !important; }

    .notif-item.unread { background: #fafbff; }
    body.dark .notif-item.unread { background: #162033 !important; }

    .notif-unread-dot {
      position: absolute;
      top: 16px; right: 16px;
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #4f6ef7;
    }

    .notif-icon-box {
      width: 36px; height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .notif-text strong {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 2px;
    }

    body.dark .notif-text strong { color: #f1f5f9 !important; }

    .notif-text p {
      font-size: 12px;
      color: #6b7280;
      margin: 0;
      line-height: 1.45;
    }

    .notif-time {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 3px;
      display: block;
    }

    .notif-empty {
      text-align: center;
      padding: 32px 20px;
    }

    .notif-empty p { font-size: 13px; color: #9ca3af; margin: 8px 0 0; }

    .notif-footer {
      padding: 12px 18px;
      text-align: center;
      border-top: 1px solid #f1f5f9;
    }

    body.dark .notif-footer { border-color: #334155 !important; }

    .notif-footer a {
      font-size: 13px;
      color: #4f6ef7;
      font-weight: 500;
      text-decoration: none;
    }

    .notif-footer a:hover { text-decoration: underline; }

    .notif-badge {
      position: absolute;
      top: -4px; right: -4px;
      width: 16px; height: 16px;
      border-radius: 50%;
      background: #ef4444;
      color: white;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      font-family: 'Inter', sans-serif;
    }

    body.dark .notif-badge { border-color: #1e293b !important; }

    /* icon-btn needs relative for badge */
    .icon-btn { position: relative; }

    /* ── USER DROPDOWN ── */
    .user-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 220px;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #eef2ff;
      box-shadow: 0 20px 60px rgba(79,110,247,0.15), 0 4px 16px rgba(0,0,0,0.06);
      z-index: 999;
      overflow: hidden;
      transform: translateY(-8px) scale(0.97);
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.34,1.4,0.64,1);
    }

    body.dark .user-dropdown {
      background: #1e293b !important;
      border-color: #334155 !important;
    }

    .user-dropdown.open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    .user-dd-header {
      padding: 16px 16px 12px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    body.dark .user-dd-header { border-color: #334155 !important; }

    .user-dd-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4f6ef7, #6a7efc);
      color: white;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-dd-name {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
    }

    body.dark .user-dd-name { color: #f1f5f9 !important; }

    .user-dd-email {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 1px;
    }

    .user-dd-list { padding: 6px 0; }

    .user-dd-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 14px;
      font-size: 13px;
      font-weight: 500;
      color: #374151;
      cursor: pointer;
      transition: background 0.15s;
      text-decoration: none;
    }

    body.dark .user-dd-item { color: #94a3b8 !important; }

    .user-dd-item:hover { background: #f5f7ff; color: #4f6ef7; }
    body.dark .user-dd-item:hover { background: #1e3a5f !important; color: #818cf8 !important; }

    .user-dd-item svg {
      width: 16px; height: 16px;
      color: #9ca3af;
      flex-shrink: 0;
    }

    .user-dd-item:hover svg { color: #4f6ef7; }
    body.dark .user-dd-item:hover svg { color: #818cf8 !important; }

    .user-dd-divider {
      height: 1px;
      background: #f1f5f9;
      margin: 4px 0;
    }

    body.dark .user-dd-divider { background: #334155 !important; }

    .user-dd-item.danger { color: #ef4444 !important; }
    .user-dd-item.danger svg { color: #ef4444 !important; }
    .user-dd-item.danger:hover { background: #fef2f2 !important; }
    body.dark .user-dd-item.danger:hover { background: #3b1219 !important; }

    /* wrap for positioning dropdowns */
    .notif-wrap, .user-wrap {
      position: relative;
    }

    /* arrow rotate on open */
    .user .arrow {
      transition: transform 0.2s;
    }

    .user-wrap.open .user .arrow {
      transform: rotate(180deg);
    }

  `;
  document.head.appendChild(style);

  /* ─────────────────────────────────────────
     WAIT FOR DOM
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {

    /* ── 1. FIND BUTTONS ── */
    const iconBtns = document.querySelectorAll('.icon-btn');
    let themeBtn = null, notifBtn = null;

    iconBtns.forEach(btn => {
      const svg = btn.querySelector('svg path');
      if (!svg) return;
      const d = svg.getAttribute('d') || '';
      if (d.includes('12.79')) themeBtn = btn;
      if (d.includes('18 8a6')) notifBtn = btn;
    });

    const userEl = document.querySelector('.user');

    /* ── 2. DARK MODE ── */
    if (themeBtn) {
      // restore saved preference
      if (localStorage.getItem('sl_dark') === '1') {
        document.body.classList.add('dark');
        themeBtn.classList.add('active-theme');
      }

      themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        themeBtn.classList.toggle('active-theme', isDark);
        localStorage.setItem('sl_dark', isDark ? '1' : '0');
      });
    }

    /* ── 3. NOTIFICATIONS ── */
    if (notifBtn) {

      // wrap button
      const notifWrap = document.createElement('div');
      notifWrap.className = 'notif-wrap';
      notifBtn.parentNode.insertBefore(notifWrap, notifBtn);
      notifWrap.appendChild(notifBtn);

      // badge
      const badge = document.createElement('div');
      badge.className = 'notif-badge';
      badge.id = 'notifBadge';
      badge.textContent = '2';
      notifBtn.appendChild(badge);

      // dropdown html
      const dropdown = document.createElement('div');
      dropdown.className = 'notif-dropdown';
      dropdown.id = 'notifDropdown';
      dropdown.innerHTML = `
        <div class="notif-header">
          <h4>Notifications</h4>
          <button class="notif-mark-all" onclick="window._markAllRead()">Mark all read</button>
        </div>
        <div class="notif-list" id="notifList">
          <div class="notif-item unread" onclick="window._readNotif(this)">
            <div class="notif-unread-dot"></div>
            <div class="notif-icon-box" style="background:#eef2ff">🎯</div>
            <div class="notif-text">
              <strong>Keep going!</strong>
              <p>You're 10% through AI Basics. Continue Lesson 2 now.</p>
              <span class="notif-time">2 hours ago</span>
            </div>
          </div>
          <div class="notif-item unread" onclick="window._readNotif(this)">
            <div class="notif-unread-dot"></div>
            <div class="notif-icon-box" style="background:#fef3c7">🔥</div>
            <div class="notif-text">
              <strong>3-day streak!</strong>
              <p>You've studied 3 days in a row. Keep it up!</p>
              <span class="notif-time">Yesterday</span>
            </div>
          </div>
          <div class="notif-item" onclick="window._readNotif(this)">
            <div class="notif-icon-box" style="background:#dcfce7">✅</div>
            <div class="notif-text">
              <strong>Lesson 1 completed</strong>
              <p>You finished "Introduction to AI". Next: Types of AI.</p>
              <span class="notif-time">2 days ago</span>
            </div>
          </div>
          <div class="notif-item" onclick="window._readNotif(this)">
            <div class="notif-icon-box" style="background:#f0f4ff">🤖</div>
            <div class="notif-text">
              <strong>AI Tutor tip</strong>
              <p>Try asking your AI tutor to explain concepts in simpler terms.</p>
              <span class="notif-time">3 days ago</span>
            </div>
          </div>
        </div>
        <div class="notif-footer">
          <a href="#">View all notifications</a>
        </div>
      `;
      notifWrap.appendChild(dropdown);

      // toggle
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeUserDd();
        dropdown.classList.toggle('open');
      });

      // mark all read
      window._markAllRead = function () {
        document.querySelectorAll('.notif-item.unread').forEach(item => {
          item.classList.remove('unread');
          const dot = item.querySelector('.notif-unread-dot');
          if (dot) dot.remove();
        });
        updateBadge();
      };

      // read single
      window._readNotif = function (item) {
        item.classList.remove('unread');
        const dot = item.querySelector('.notif-unread-dot');
        if (dot) dot.remove();
        updateBadge();
      };

      function updateBadge() {
        const count = document.querySelectorAll('.notif-item.unread').length;
        const b = document.getElementById('notifBadge');
        if (!b) return;
        if (count === 0) {
          b.style.display = 'none';
        } else {
          b.style.display = 'flex';
          b.textContent = count;
        }
      }
    }

    /* ── 4. USER DROPDOWN ── */
    if (userEl) {

      const userWrap = document.createElement('div');
      userWrap.className = 'user-wrap';
      userEl.parentNode.insertBefore(userWrap, userEl);
      userWrap.appendChild(userEl);

      const userDd = document.createElement('div');
      userDd.className = 'user-dropdown';
      userDd.id = 'userDropdown';

      // get name from DOM
      const nameEl = userEl.querySelector('span');
      const name = nameEl ? nameEl.textContent.trim() : 'User';
      const initial = name.charAt(0).toUpperCase();
      const email = localStorage.getItem('smartlearn_email') || 'serik@email.com';

      userDd.innerHTML = `
        <div class="user-dd-header">
          <div class="user-dd-avatar">${initial}</div>
          <div>
            <div class="user-dd-name">${name}</div>
            <div class="user-dd-email">${email}</div>
          </div>
        </div>
        <div class="user-dd-list">
          <a href="profile.html" class="user-dd-item">
            <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c1.8-3.5 5-5 8-5s6.2 1.5 8 5" stroke="currentColor" stroke-width="1.8"/></svg>
            My Profile
          </a>
          <a href="my-courses.html" class="user-dd-item">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5a2 2 0 0 1 2-2h12v16a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z" stroke="currentColor" stroke-width="1.8"/></svg>
            My Courses
          </a>
          <a href="certificates.html" class="user-dd-item">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            Certificates
          </a>
          <div class="user-dd-divider"></div>
          <a href="profile.html" class="user-dd-item">
            <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M19 12h2M3 12h2M12 3v2M12 19v2" stroke="currentColor" stroke-width="1.8"/></svg>
            Settings
          </a>
          <div class="user-dd-divider"></div>
          <div class="user-dd-item danger" onclick="window._logout()">
            <svg viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Log out
          </div>
        </div>
      `;

      userWrap.appendChild(userDd);

      userEl.addEventListener('click', (e) => {
        e.stopPropagation();
        closeNotifDd();
        userDd.classList.toggle('open');
        userWrap.classList.toggle('open');
      });

      window._logout = function () {
        if (confirm('Log out of SmartLearn AI?')) {
          localStorage.removeItem('user');
          window.location.href = 'login.html';
        }
      };
    }

    /* ── CLOSE ON OUTSIDE CLICK ── */
    document.addEventListener('click', () => {
      closeNotifDd();
      closeUserDd();
    });

    function closeNotifDd() {
      const dd = document.getElementById('notifDropdown');
      if (dd) dd.classList.remove('open');
    }

    function closeUserDd() {
      const dd = document.getElementById('userDropdown');
      if (dd) dd.classList.remove('open');
      const wrap = document.querySelector('.user-wrap');
      if (wrap) wrap.classList.remove('open');
    }

    // prevent dropdown self-close
    document.querySelectorAll('#notifDropdown, #userDropdown').forEach(dd => {
      if (dd) dd.addEventListener('click', e => e.stopPropagation());
    });
  }

})();