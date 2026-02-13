(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();const ee=1800;var K;const te=((K=performance.now)==null?void 0:K.call(performance))??Date.now();window.addEventListener("load",()=>{var n;const s=document.getElementById("loading-screen");if(!s)return;const t=(((n=performance.now)==null?void 0:n.call(performance))??Date.now())-te,e=Math.max(0,ee-t);setTimeout(()=>{s.classList.add("fade-out"),s.addEventListener("transitionend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},1e3)},e)});class D{constructor(){this.key="gameLibrary_wishlist",this.wishlist=JSON.parse(localStorage.getItem(this.key)||"[]")}getWishlist(){return this.wishlist}isInWishlist(t){return this.wishlist.some(e=>e.id===t)}addToWishlist(t){return this.isInWishlist(t.id)?!1:(this.wishlist.push(t),localStorage.setItem(this.key,JSON.stringify(this.wishlist)),this.updateCount(),!0)}removeFromWishlist(t){return this.wishlist=this.wishlist.filter(e=>e.id!==t),localStorage.setItem(this.key,JSON.stringify(this.wishlist)),this.updateCount(),!0}toggleWishlist(t){this.isInWishlist(t.id)?this.removeFromWishlist(t.id):this.addToWishlist(t),this.updateWishlistIndicators(),this.updateCount()}updateCount(){const t=document.getElementById("wishlist-count");t&&(t.textContent=`(${this.wishlist.length})`);const e=document.getElementById("empty-wishlist");e&&(e.style.display=this.wishlist.length===0?"block":"none")}updateWishlistIndicators(){document.querySelectorAll(".heart").forEach(e=>{const n=parseInt(e.closest(".game-card").dataset.id);e.classList.toggle("active",this.isInWishlist(n))});const t=document.getElementById("wishlist-btn");if(t){const e=parseInt(t.dataset.gameId);this.isInWishlist(e)?(t.classList.add("active"),t.innerHTML="<span>❤️</span> Added to Wishlist"):(t.classList.remove("active"),t.innerHTML="<span>❤️</span> Add to Wishlist")}}init(){this.updateCount(),this.updateWishlistIndicators(),document.addEventListener("click",t=>{if(t.target.closest(".wishlist-btn")){const e=t.target.closest(".wishlist-btn"),a={id:parseInt(e.dataset.gameId),name:e.dataset.gameName,background_image:e.dataset.gameImage};this.toggleWishlist(a)}if(t.target.closest(".heart")){t.preventDefault(),t.stopPropagation();const n=t.target.closest(".heart").closest(".game-card"),r={id:parseInt(n.dataset.id),name:n.dataset.name,background_image:n.dataset.image};this.toggleWishlist(r)}})}}function F(s,t){const e=document.getElementById(t);if(e){if(!s||s.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No games found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;return}e.innerHTML=s.map(n=>`
        <article class="game-card" 
                 data-id="${n.id}" 
                 data-name="${n.name}" 
                 data-image="${n.background_image||""}">
            <div class="wishlist-icon">
                <span class="heart" title="Add to Wishlist">♥</span>
            </div>
            <div class="card-image-wrapper">
                <button class="watch-trailer-btn" onclick="event.stopPropagation(); window.openTrailer(${n.id}, '${(n.name||"").replace(/'/g,"\\'")}')">
                    ▶ Trailer
                </button>
                <img src="${n.background_image||"https://via.placeholder.com/300x200?text=No+Image"}" 
                     alt="${n.name||"Game"}" 
                     class="game-cover"
                     loading="lazy"
                     onclick="window.location.href='game-details.html?id=${n.id}'">
            </div>
            <div class="game-info">
                <h3 class="game-title">${n.name||"Unknown"}</h3>
                <div class="game-meta">
                    <span class="release-date">${n.released?new Date(n.released).toLocaleDateString():"TBA"}</span>
                    <span class="rating">${n.rating?`⭐ ${n.rating.toFixed(1)}`:"No rating"}</span>
                </div>
                <div class="platforms">
                    ${(n.parent_platforms||[]).slice(0,3).map(a=>{var r;return`<span class="platform">${((r=a==null?void 0:a.platform)==null?void 0:r.name)||""}</span>`}).join("")}
                </div>
                <button class="btn download-btn" onclick="event.stopPropagation(); window.location.href='game-details.html?id=${n.id}'">
                    VIEW DETAILS
                </button>
            </div>
        </article>
    `).join(""),ne()}}function ne(){const s=JSON.parse(localStorage.getItem("gameLibrary_wishlist")||"[]");document.querySelectorAll(".game-card").forEach(t=>{const e=parseInt(t.dataset.id),n=t.querySelector(".heart");n&&s.some(a=>a.id===e)&&n.classList.add("active")})}function X(s){const t=document.getElementById("wishlist-container");if(t){if(!s||s.length===0){t.innerHTML=`
            <div class="empty-state" id="empty-wishlist">
                <h3>Your wishlist is empty</h3>
                <p>Browse games and add them to your wishlist!</p>
                <a href="index.html" class="btn">Browse Games</a>
            </div>
        `;return}t.innerHTML=`
        <div class="games-grid wishlist-grid">
            ${s.map(e=>`
                <article class="game-card" 
                         data-id="${e.id}" 
                         data-name="${e.name}" 
                         data-image="${e.background_image||""}"
                         onclick="window.location.href='game-details.html?id=${e.id}'">
                    <div class="wishlist-icon">
                        <span class="heart active" title="Remove from Wishlist">♥</span>
                    </div>
                    <img src="${e.background_image||"https://via.placeholder.com/300x200?text=No+Image"}" 
                         alt="${e.name}" 
                         class="game-cover"
                         loading="lazy">
                    <div class="game-info">
                        <h3 class="game-title">${e.name}</h3>
                        <button class="btn btn-secondary remove-btn" 
                                data-id="${e.id}"
                                onclick="event.stopPropagation();">
                            Remove
                        </button>
                    </div>
                </article>
            `).join("")}
        </div>
    `,t.querySelectorAll(".remove-btn").forEach(e=>{e.addEventListener("click",n=>{n.stopPropagation();const a=parseInt(e.dataset.id);let r=JSON.parse(localStorage.getItem("gameLibrary_wishlist")||"[]");r=r.filter(o=>o.id!==a),localStorage.setItem("gameLibrary_wishlist",JSON.stringify(r)),X(r);const i=document.getElementById("wishlist-count");i&&(i.textContent=`(${r.length})`)})})}}function ae(s){var L,p,v,m,u,M,G,w,E;if(!s){const d=document.querySelector(".game-detail");d&&(d.innerHTML=`
                <div class="error-container">
                    <h2>Game Not Found</h2>
                    <p>We couldn't load the game details. Please try again later.</p>
                    <a href="index.html" class="btn">Return to Browse</a>
                </div>
            `);return}const t=document.getElementById("game-title");t&&(t.textContent=s.name);const e=document.getElementById("developer"),n=document.getElementById("publisher");e&&(e.textContent=((p=(L=s.developers)==null?void 0:L[0])==null?void 0:p.name)||"Unknown Studio"),n&&(n.textContent=((m=(v=s.publishers)==null?void 0:v[0])==null?void 0:m.name)||"Unknown Publisher");const a=document.getElementById("game-description");if(a){const d=((u=s.description_raw)==null?void 0:u.substring(0,200))||"No description available.";a.innerHTML=`<p>${d}...</p>`}const r=document.getElementById("game-overview");r&&(r.textContent=((M=s.description_raw)==null?void 0:M.substring(0,300))||"No overview available.");const i=document.getElementById("game-cover");i&&(i.src=s.background_image||"https://via.placeholder.com/600x300?text=No+Image");const o=document.getElementById("game-size");o&&(o.textContent=s.playtime?`${s.playtime}h playtime`:"--");const l=document.getElementById("genres");l&&(l.textContent=((G=s.genres)==null?void 0:G.map(d=>d.name).join(", "))||"N/A");const c=document.getElementById("release-date");c&&(c.textContent=s.released?new Date(s.released).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"TBA");const h=document.getElementById("platforms");if(h){const d=((w=s.platforms)==null?void 0:w.map(f=>{var b;return((b=f.platform)==null?void 0:b.name)||f.name}).join(", "))||((E=s.parent_platforms)==null?void 0:E.map(f=>f.platform.name).join(", "))||"N/A";h.textContent=d}const $=document.getElementById("rating");$&&($.textContent=s.rating?`${s.rating.toFixed(1)}/5 ⭐`:"N/A"),se(s)}function se(s){const t=document.getElementById("screenshots-container");if(!t)return;const e=s.screenshots||s.short_screenshots||[];if(e.length===0){t.innerHTML="<p>No screenshots available</p>";return}t.innerHTML=e.slice(0,5).map(n=>`
            <div class="screenshot-item">
                <img src="${n.url?n.url.replace("t_screenshot","t_1080p"):n.image||n}" 
                     alt="Game screenshot"
                     loading="lazy">
            </div>
        `).join("")}function re(s,t){const e=document.getElementById(t);if(e){if(!s||s.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No deals found</h3>
                <p>Check back later for new deals!</p>
            </div>
        `;return}e.innerHTML=s.map(n=>{const a=Math.round(parseFloat(n.savings)),r=parseFloat(n.normalPrice).toFixed(2),i=parseFloat(n.salePrice).toFixed(2);return`
            <article class="deal-card">
                <div class="deal-image">
                    <img src="${n.thumb}" 
                         alt="${n.title}" 
                         loading="lazy"
                         onerror="this.src='https://via.placeholder.com/300x150?text=No+Image'">
                    ${a>0?`<span class="deal-badge">-${a}%</span>`:""}
                </div>
                <div class="deal-info">
                    <h3 class="deal-title">${n.title}</h3>
                    <div class="deal-prices">
                        ${a>0?`<span class="original-price">$${r}</span>`:""}
                        <span class="sale-price">${i==="0.00"?"FREE":`$${i}`}</span>
                    </div>
                    <div class="deal-meta">
                        <span class="deal-rating">⭐ ${n.dealRating||"N/A"}</span>
                        <span class="metacritic">${n.metacriticScore?`Metacritic: ${n.metacriticScore}`:""}</span>
                    </div>
                    <a href="https://www.cheapshark.com/redirect?dealID=${n.dealID}" 
                       target="_blank" 
                       class="btn btn-secondary deal-btn">
                        Get Deal
                    </a>
                </div>
            </article>
        `}).join("")}}function ie(s,t){const e=document.getElementById(t);if(e){if(!s||s.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No free games found</h3>
                <p>Try a different category</p>
            </div>
        `;return}e.innerHTML=s.map(n=>{var a;return`
        <article class="game-card free-game-card">
            <div class="free-badge">FREE</div>
            <img src="${n.thumbnail}" 
                 alt="${n.title}" 
                 class="game-cover"
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <div class="game-info">
                <h3 class="game-title">${n.title}</h3>
                <div class="game-meta">
                    <span class="genre">${n.genre}</span>
                    <span class="platform">${n.platform}</span>
                </div>
                <p class="game-desc">${((a=n.short_description)==null?void 0:a.substring(0,100))||""}...</p>
                <a href="${n.game_url}" 
                   target="_blank" 
                   class="btn btn-secondary">
                    Play Now
                </a>
            </div>
        </article>
    `}).join("")}}function oe(s,t){const e=document.getElementById(t);if(e){if(!s||s.length===0){e.innerHTML="<p>No recommendations available</p>";return}e.innerHTML=`
        <div class="recommendations-grid">
            ${s.map(n=>{var a;return`
                <div class="recommendation-card" onclick="window.location.href='game-details.html?id=${n.id}'">
                    <img src="${n.background_image||"https://via.placeholder.com/150x100"}" 
                         alt="${n.name}"
                         loading="lazy">
                    <div class="rec-info">
                        <h4>${n.name}</h4>
                        <span class="rec-rating">⭐ ${((a=n.rating)==null?void 0:a.toFixed(1))||"N/A"}</span>
                    </div>
                </div>
            `}).join("")}
        </div>
    `}}function ce(s,t){var a;const e=document.getElementById(`slot-${t+1}`);if(!e)return;e.innerHTML=`
        <div class="slot-filled">
            <button class="remove-game" title="Remove">&times;</button>
            <img src="${s.background_image||"https://via.placeholder.com/200x120"}" 
                 alt="${s.name}">
            <h4>${s.name}</h4>
            <p class="slot-rating">⭐ ${((a=s.rating)==null?void 0:a.toFixed(2))||"N/A"}</p>
        </div>
    `;const n=document.getElementById(`col-${t+1}`);n&&(n.textContent=s.name.length>20?s.name.substring(0,20)+"...":s.name)}function le(s){const t=document.getElementById("comparison-body");t&&(t.innerHTML=s.attributes.map(e=>`
        <tr>
            <td class="attr-name">${e.name}</td>
            ${e.values.map((n,a)=>`
                <td class="${e.highlightIndex===a?"highlight-winner":""}">${n}</td>
            `).join("")}
            ${e.values.length<3?"<td>-</td>".repeat(3-e.values.length):""}
        </tr>
    `).join(""))}const k="d2663c76d7194a21821130c805530d61",S="https://api.rawg.io/api",de="/igdb",T={MAX_REQUESTS:40,PER_MINUTE:6e4,lastRequests:[]};class me{constructor(){this.initializeRateLimiter()}initializeRateLimiter(){setInterval(()=>{const t=Date.now();T.lastRequests=T.lastRequests.filter(e=>t-e<T.PER_MINUTE)},3e4)}async fetchWithRateLimit(t){const e=Date.now();if(T.lastRequests=T.lastRequests.filter(a=>e-a<T.PER_MINUTE),T.lastRequests.length>=T.MAX_REQUESTS){const a=T.PER_MINUTE-(e-T.lastRequests[0]);await new Promise(r=>setTimeout(r,a))}T.lastRequests.push(Date.now());const n=await fetch(t);if(!n.ok)throw new Error(`API Error: ${n.status} ${n.statusText}`);return await n.json()}async fetchGames(t={}){const e=new URLSearchParams({key:k,page_size:t.page_size||20,...t}),n=`${S}/games?${e}`;return await this.fetchWithRateLimit(n)}async searchGames(t){const e=new URLSearchParams({key:k,search:t,page_size:20}),n=`${S}/games?${e}`;return await this.fetchWithRateLimit(n)}async getGameDetails(t){const e=`${S}/games/${t}?key=${k}`;return await this.fetchWithRateLimit(e)}async getGameScreenshots(t){const e=`${S}/games/${t}/screenshots?key=${k}`,n=await this.fetchWithRateLimit(e);return(n==null?void 0:n.results)||[]}async getIgdbGameDetails(t){try{const e=`
                fields name, summary, storyline, first_release_date, 
                       genres.name, platforms.name, 
                       involved_companies.company.name,
                       screenshots.url, videos.video_id;
                where name ~ "${t}";
                limit 1;
            `,n=await fetch(de,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:e})});if(!n.ok)throw new Error(`IGDB request failed: ${n.status}`);return(await n.json())[0]||null}catch(e){return console.error("IGDB details error:",e),null}}async getEnhancedGameDetails(t){var e,n,a,r,i,o,l,c,h,$,L,p;try{const v=await this.getGameDetails(t);if(!v)return null;const m=await this.getIgdbGameDetails(v.name);return{...v,summary:(m==null?void 0:m.summary)||v.description_raw,storyline:m==null?void 0:m.storyline,genres:((e=m==null?void 0:m.genres)==null?void 0:e.map(u=>u.name))||((n=v.genres)==null?void 0:n.map(u=>u.name)),developer:((i=(r=(a=m==null?void 0:m.involved_companies)==null?void 0:a.filter(u=>u.developer))==null?void 0:r.map(u=>u.company.name))==null?void 0:i.join(", "))||((o=v.developers)==null?void 0:o.map(u=>u.name).join(", ")),publisher:((h=(c=(l=m==null?void 0:m.involved_companies)==null?void 0:l.filter(u=>u.publisher))==null?void 0:c.map(u=>u.company.name))==null?void 0:h.join(", "))||(($=v.publishers)==null?void 0:$.map(u=>u.name).join(", ")),screenshots:((L=m==null?void 0:m.screenshots)==null?void 0:L.map(u=>({id:u.id,url:u.url.replace("t_screenshot","t_1080p")})))||v.short_screenshots,videos:((p=m==null?void 0:m.videos)==null?void 0:p.map(u=>({id:u.video_id,name:u.name})))||[]}}catch(v){return console.error("Enhanced details error:",v),this.getGameDetails(t)}}async getSimilarGames(t){const e=`${S}/games/${t}/game-series?key=${k}&page_size=6`,n=await this.fetchWithRateLimit(e);return(n==null?void 0:n.results)||[]}async getGamesByDeveloper(t){const e=`${S}/games?key=${k}&developers=${t}&page_size=6`,n=await this.fetchWithRateLimit(e);return(n==null?void 0:n.results)||[]}async getGamesByGenre(t,e=null){const n=`${S}/games?key=${k}&genres=${t}&page_size=10&ordering=-rating`,a=await this.fetchWithRateLimit(n);let r=(a==null?void 0:a.results)||[];return e&&(r=r.filter(i=>i.id!==parseInt(e))),r.slice(0,6)}async getRecommendations(t){const e=await this.getGameDetails(t);if(!e)return[];const n=await this.getSimilarGames(t);if(n.length>=4)return n;if(e.genres&&e.genres.length>0){const a=e.genres[0].id,r=await this.getGamesByGenre(a,t),i=[...n];for(const o of r)if(!i.find(l=>l.id===o.id)&&o.id!==parseInt(t)&&i.push(o),i.length>=6)break;return i}return n}async getPlatforms(){const t=`${S}/platforms?key=${k}&page_size=20`,e=await this.fetchWithRateLimit(t);return(e==null?void 0:e.results)||[]}async getGenres(){const t=`${S}/genres?key=${k}`,e=await this.fetchWithRateLimit(t);return(e==null?void 0:e.results)||[]}async fetchGamesWithFilters(t={}){const e={key:k,page_size:t.page_size||20};t.platforms&&(e.platforms=t.platforms),t.genres&&(e.genres=t.genres),t.ordering&&(e.ordering=t.ordering),t.search&&(e.search=t.search),t.dates&&(e.dates=t.dates),t.metacritic&&(e.metacritic=t.metacritic);const n=new URLSearchParams(e),a=`${S}/games?${n}`;return await this.fetchWithRateLimit(a)}async getGameTrailer(t,e){var n,a;try{const r=`${S}/games/${t}/movies?key=${k}`,i=await this.fetchWithRateLimit(r);if(i&&i.results&&i.results.length>0){const c=i.results[0],h=((n=c.data)==null?void 0:n.max)||((a=c.data)==null?void 0:a["480"])||null;if(h)return{source:"rawg",id:c.id,name:c.name,preview:c.preview,videoUrl:h}}const o=`${e} official game trailer`,l=await this.searchYouTubeVideoId(o);return l?{source:"youtube",videoId:l,embedUrl:`https://www.youtube.com/embed/${l}?autoplay=1&rel=0`}:{source:"fallback",searchUrl:`https://www.youtube.com/results?search_query=${encodeURIComponent(o)}`}}catch(r){return console.error("Trailer fetch error:",r),{source:"fallback",searchUrl:`https://www.youtube.com/results?search_query=${encodeURIComponent(e+" trailer")}`}}}async searchYouTubeVideoId(t){var n;const e=["https://pipedapi.kavin.rocks","https://pipedapi.adminforge.de","https://api.piped.projectsegfault.com"];for(const a of e)try{const r=`${a}/search?q=${encodeURIComponent(t)}&filter=videos`,i=await fetch(r,{signal:AbortSignal.timeout(5e3)});if(!i.ok)continue;const o=await i.json();if(o.items&&o.items.length>0){const l=(n=o.items[0].url)==null?void 0:n.match(/[?&]v=([^&]+)/);if(l)return l[1]}}catch(r){console.warn(`Piped instance ${a} failed:`,r.message)}return null}}const g=new me;class ue{constructor(){this.currentFilters={platforms:[],genres:[],ordering:"-rating",search:""},this.allGames=[]}setFilter(t,e){Array.isArray(this.currentFilters[t])?this.currentFilters[t].includes(e)?this.currentFilters[t]=this.currentFilters[t].filter(n=>n!==e):this.currentFilters[t].push(e):this.currentFilters[t]=e}clearFilters(){this.currentFilters={platforms:[],genres:[],ordering:"-rating",search:""}}getFilters(){return{...this.currentFilters}}buildFilterParams(){const t={};return this.currentFilters.platforms.length>0&&(t.platforms=this.currentFilters.platforms.join(",")),this.currentFilters.genres.length>0&&(t.genres=this.currentFilters.genres.join(",")),this.currentFilters.ordering&&(t.ordering=this.currentFilters.ordering),this.currentFilters.search&&(t.search=this.currentFilters.search),t}async fetchFilteredGames(){const t=this.buildFilterParams();return await g.fetchGamesWithFilters(t)}filterGames(t){let e=[...t];if(this.currentFilters.platforms.length>0&&(e=e.filter(n=>{var r;const a=((r=n.parent_platforms)==null?void 0:r.map(i=>i.platform.id))||[];return this.currentFilters.platforms.some(i=>a.includes(parseInt(i)))})),this.currentFilters.genres.length>0&&(e=e.filter(n=>{var r;const a=((r=n.genres)==null?void 0:r.map(i=>i.id))||[];return this.currentFilters.genres.some(i=>a.includes(parseInt(i)))})),this.currentFilters.search){const n=this.currentFilters.search.toLowerCase();e=e.filter(a=>a.name.toLowerCase().includes(n))}return e=this.sortGames(e,this.currentFilters.ordering),e}sortGames(t,e){const n=[...t];switch(e){case"-rating":n.sort((a,r)=>(r.rating||0)-(a.rating||0));break;case"rating":n.sort((a,r)=>(a.rating||0)-(r.rating||0));break;case"-released":n.sort((a,r)=>new Date(r.released||0)-new Date(a.released||0));break;case"released":n.sort((a,r)=>new Date(a.released||0)-new Date(r.released||0));break;case"name":n.sort((a,r)=>a.name.localeCompare(r.name));break;case"-name":n.sort((a,r)=>r.name.localeCompare(a.name));break;case"-metacritic":n.sort((a,r)=>(r.metacritic||0)-(a.metacritic||0));break}return n}async searchGames(t){return this.currentFilters.search=t,await g.searchGames(t)}async getPlatformOptions(){return(await g.getPlatforms()).map(e=>({id:e.id,name:e.name,slug:e.slug}))}async getGenreOptions(){return(await g.getGenres()).map(e=>({id:e.id,name:e.name,slug:e.slug}))}}const _=new ue;class he{constructor(){this.slots=[null,null,null],this.maxSlots=4}addGame(t){const e=this.slots.findIndex(n=>n===null);return e===-1?{success:!1,message:"All comparison slots are full"}:this.slots.some(n=>n&&n.id===t.id)?{success:!1,message:"Game already in comparison"}:(this.slots[e]=t,{success:!0,slot:e})}removeGame(t){return t>=0&&t<this.maxSlots?(this.slots[t]=null,!0):!1}getGames(){return[...this.slots]}getGame(t){return this.slots[t]}clearAll(){this.slots=[null,null,null]}getComparisonData(){const t=this.slots.filter(e=>e!==null);return t.length<2?null:{games:t,attributes:this.buildAttributeComparison(t)}}buildAttributeComparison(t){return[{name:"Rating",key:"rating",format:n=>n?`⭐ ${n.toFixed(2)}/5`:"N/A",highlight:"max"},{name:"Metacritic",key:"metacritic",format:n=>n?`${n}/100`:"N/A",highlight:"max"},{name:"Release Date",key:"released",format:n=>n?new Date(n).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"TBA",highlight:null},{name:"Genres",key:"genres",format:n=>(n==null?void 0:n.map(a=>a.name).join(", "))||"N/A",highlight:null},{name:"Platforms",key:"parent_platforms",format:n=>(n==null?void 0:n.map(a=>a.platform.name).join(", "))||"N/A",highlight:null},{name:"Playtime",key:"playtime",format:n=>n?`${n} hours`:"N/A",highlight:null},{name:"ESRB Rating",key:"esrb_rating",format:n=>(n==null?void 0:n.name)||"Not Rated",highlight:null},{name:"Achievements",key:"achievements_count",format:n=>n?`${n} achievements`:"N/A",highlight:"max"}].map(n=>{const a=t.map(o=>o[n.key]),r=a.map(o=>n.format(o));let i=null;if(n.highlight==="max"){const o=a.map(c=>typeof c=="number"?c:0),l=Math.max(...o);l>0&&(i=o.indexOf(l))}return{name:n.name,values:r,highlightIndex:i}})}getWinners(){const t=this.getComparisonData();if(!t)return null;const e={};return t.attributes.forEach(n=>{if(n.highlightIndex!==null){const a=t.games[n.highlightIndex];e[n.name]=a?a.name:null}}),e}saveComparison(){const t=this.slots.map(e=>e?{id:e.id,name:e.name}:null);localStorage.setItem("gameComparison",JSON.stringify(t))}async loadComparison(){const t=localStorage.getItem("gameComparison");if(t)try{const e=JSON.parse(t);for(let n=0;n<e.length;n++)if(e[n]&&e[n].id){const a=await g.getGameDetails(e[n].id);a&&(this.slots[n]=a)}}catch(e){console.error("Failed to load comparison:",e)}}}const H=new he;class ge{constructor(){this.cache=new Map,this.cacheTimeout=5*60*1e3}getCached(t){const e=this.cache.get(t);return e&&Date.now()-e.timestamp<this.cacheTimeout?e.data:null}setCache(t,e){this.cache.set(t,{data:e,timestamp:Date.now()})}async getRecommendationsForGame(t){const e=`recommendations_${t}`,n=this.getCached(e);if(n)return n;try{const a=await g.getRecommendations(t);return this.setCache(e,a),a}catch(a){return console.error("Recommendation error:",a),[]}}async getSimilarGames(t){var a;if(!t)return[];const e=`similar_${t.id}`,n=this.getCached(e);if(n)return n;try{const r=[],i=await g.getSimilarGames(t.id);if(r.push(...i),r.length<6&&((a=t.genres)==null?void 0:a.length)>0)for(const o of t.genres.slice(0,2)){const l=await g.getGamesByGenre(o.id,t.id);for(const c of l)if(!r.find(h=>h.id===c.id)&&c.id!==t.id&&r.push(c),r.length>=6)break;if(r.length>=6)break}return this.setCache(e,r.slice(0,6)),r.slice(0,6)}catch(r){return console.error("Similar games error:",r),[]}}async getPersonalizedRecommendations(t){if(!t||t.length===0)return[];try{const e=[],n=new Set(t.map(a=>a.id));for(const a of t.slice(0,3)){const r=await this.getRecommendationsForGame(a.id);for(const i of r)n.has(i.id)||(e.push(i),n.add(i.id))}return e.sort((a,r)=>(r.rating||0)-(a.rating||0)).slice(0,10)}catch(e){return console.error("Personalized recommendations error:",e),[]}}calculateSimilarityScore(t,e){var w,E,d,f;let n=0;const a=new Set(((w=t.genres)==null?void 0:w.map(b=>b.id))||[]),r=new Set(((E=e.genres)==null?void 0:E.map(b=>b.id))||[]),i=[...a].filter(b=>r.has(b)).length;n+=Math.min(i*10,30);const o=new Set(((d=t.parent_platforms)==null?void 0:d.map(b=>b.platform.id))||[]),l=new Set(((f=e.parent_platforms)==null?void 0:f.map(b=>b.platform.id))||[]),c=[...o].filter(b=>l.has(b)).length;n+=Math.min(c*5,20);const h=t.rating||0,$=e.rating||0,L=Math.abs(h-$);n+=Math.max(0,20-L*10);const p=new Date(t.released).getFullYear(),v=new Date(e.released).getFullYear(),m=Math.abs(p-v);n+=Math.max(0,15-m);const u=t.metacritic||0,M=e.metacritic||0,G=Math.abs(u-M);return n+=Math.max(0,15-G/5),n}rankBySimilarity(t,e){return e.map(n=>({...n,similarityScore:this.calculateSimilarityScore(t,n)})).sort((n,a)=>a.similarityScore-n.similarityScore)}clearCache(){this.cache.clear()}}const pe=new ge;window.openTrailer=async function(s,t){const e=document.getElementById("trailer-modal"),n=document.getElementById("trailer-container"),a=document.getElementById("trailer-title");if(!(!e||!n)){e.classList.add("active"),a.textContent=`${t} - Loading Trailer...`,n.innerHTML='<div class="trailer-fallback"><div class="trailer-spinner"></div><p>🎬 Searching for trailer...</p></div>';try{const r=await g.getGameTrailer(s,t);if(r&&r.source==="rawg")a.textContent=`${t} - Official Trailer`,n.innerHTML=`<video controls autoplay playsinline><source src="${r.videoUrl}" type="video/mp4">Your browser does not support video.</video>`;else if(r&&r.source==="youtube")a.textContent=`${t} - Official Trailer`,n.innerHTML=`<iframe src="${r.embedUrl}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;else{a.textContent=`${t} - Trailer`;const i=(r==null?void 0:r.searchUrl)||`https://www.youtube.com/results?search_query=${encodeURIComponent(t+" official game trailer")}`;n.innerHTML=`
                <div class="trailer-fallback">
                    <p>😕 Could not find an embeddable trailer.</p>
                    <a href="${i}" target="_blank" class="trailer-yt-btn">▶ Search on YouTube</a>
                </div>
            `}}catch(r){console.error("Trailer error:",r),a.textContent=`${t} - Trailer`;const i=`https://www.youtube.com/results?search_query=${encodeURIComponent(t+" official game trailer")}`;n.innerHTML=`
            <div class="trailer-fallback">
                <p>😕 Something went wrong loading the trailer.</p>
                <a href="${i}" target="_blank" class="trailer-yt-btn">▶ Search on YouTube</a>
            </div>
        `}}};window.closeTrailer=function(){const s=document.getElementById("trailer-modal"),t=document.getElementById("trailer-container");s&&s.classList.remove("active"),t&&(t.innerHTML="")};document.addEventListener("DOMContentLoaded",async()=>{await O("header","header-placeholder"),await O("footer","footer-placeholder"),new D().init(),fe(),ye();const t=document.getElementById("trailer-modal"),e=document.getElementById("trailer-close");e&&e.addEventListener("click",window.closeTrailer),t&&t.addEventListener("click",n=>{n.target===t&&window.closeTrailer()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&window.closeTrailer()}),document.body.id==="index-page"?await ve():document.body.id==="detail-page"?await Ee():document.body.id==="wishlist-page"?$e():document.body.id==="upcoming-page"?await ke():document.body.id==="deals-page"?await Me():document.body.id==="free-games-page"?await Ge():document.body.id==="comparison-page"&&await Fe()});async function O(s,t){try{const e=await fetch(`partials/${s}.html`);if(!e.ok)throw new Error(`Failed to load ${s}`);const n=await e.text();document.getElementById(t).innerHTML=n}catch(e){console.error(`Error loading ${s}:`,e),document.getElementById(t).innerHTML=`<div class="error">Failed to load ${s}. Please refresh.</div>`}}function fe(){const s=window.location.pathname;document.querySelectorAll(".nav-link").forEach(e=>{new URL(e.href).pathname===s?e.classList.add("active"):e.classList.remove("active")})}function ye(){const s=document.getElementById("hamburger-btn"),t=document.getElementById("main-nav");!s||!t||(s.addEventListener("click",()=>{s.classList.toggle("active"),t.classList.toggle("open")}),t.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault();const a=e.getAttribute("href");s.classList.remove("active"),t.classList.remove("open"),setTimeout(()=>{window.location.href=a},200)})}),document.addEventListener("click",e=>{!s.contains(e.target)&&!t.contains(e.target)&&(s.classList.remove("active"),t.classList.remove("open"))}))}function R(s,t="Loading..."){const e=document.getElementById(s);e&&(e.innerHTML=`<div class="loading"><div class="spinner"></div><p>${t}</p></div>`)}function Q(s,t){const e=document.getElementById(s);e&&(e.innerHTML=`
        <div class="error-container" style="text-align:center; padding:2rem; background:rgba(255,255,255,0.05); border-radius:8px; border:1px solid rgba(233,69,96,0.3);">
            <p style="color:#ff6b6b; font-size:1rem; margin-bottom:0.8rem;">⚠️ Could not load this section</p>
            <button class="btn" onclick="location.reload()" style="padding:0.5rem 1.5rem;">🔄 Retry</button>
        </div>`)}async function z(s,t,e){R(s);try{const n=await t();if(n&&n.length>0)e(n,s);else{const a=document.getElementById(s);a&&(a.innerHTML=`
                <div class="empty-state" style="text-align:center; padding:2rem; background:rgba(255,255,255,0.05); border-radius:8px;">
                    <p style="color:rgba(255,255,255,0.6);">No games found for this section right now.</p>
                    <button class="btn btn-secondary" onclick="location.reload()" style="margin-top:0.5rem;">Retry</button>
                </div>`)}}catch(n){console.error(`Section ${s} failed:`,n),Q(s)}}async function ve(){var M,G;document.body.id="index-page";const s="4,18,187,1,186,7,3,21",t=new Date;new Date().setMonth(t.getMonth()-3);const n=t.toISOString().split("T")[0],a=new Date;a.setMonth(t.getMonth()+3);const r=a.toISOString().split("T")[0];R("games-container","Loading popular games..."),R("upcoming-container","Loading upcoming releases...");try{const E=((await g.fetchGames({page_size:15,ordering:"-metacritic",metacritic:"85,100",platforms:s})).results||[]).filter(d=>d.background_image);if(E.sort((d,f)=>(f.metacritic||0)-(d.metacritic||0)),E.length>0){let y=function(B){const I=E[B],x=document.getElementById("featured-bg"),P=document.querySelector(".featured-content");x&&(x.style.opacity="0"),P&&(P.style.opacity="0"),setTimeout(()=>{var U;const N=document.getElementById("featured-title"),W=document.getElementById("featured-platforms"),q=document.getElementById("featured-link"),j=document.getElementById("featured-trailer");N&&(N.textContent=I.name),W&&(W.textContent=`Available on ${((U=I.parent_platforms)==null?void 0:U.map(C=>C.platform.name).join(", "))||"Multiple Platforms"}`),q&&(q.href=`game-details.html?id=${I.id}`),x&&I.background_image&&(x.style.backgroundImage=`url('${I.background_image}')`),j&&(j.onclick=()=>window.openTrailer(I.id,I.name)),document.querySelectorAll(".slide-dot").forEach((C,Z)=>C.classList.toggle("active",Z===B)),x&&(x.style.opacity="1"),P&&(P.style.opacity="1")},400)};var u=y;let d=0;const f=document.getElementById("featured-game"),b=E.slice(0,10);f.insertAdjacentHTML("beforeend",`<div class="slide-indicator">${b.map((B,I)=>`<span class="slide-dot ${I===0?"active":""}" data-index="${I}"></span>`).join("")}</div>`),y(0),setInterval(()=>{d=(d+1)%Math.min(E.length,10),y(d)},5e3),document.querySelectorAll(".slide-dot").forEach(B=>B.addEventListener("click",I=>{d=parseInt(I.target.dataset.index),y(d)}))}}catch(w){console.error("Featured carousel error:",w)}let i=1;const o=21;let l=0,c=1;async function h(w){var E;i=w,R("games-container","Loading games...");try{const d=await g.fetchGames({ordering:"-metacritic,-rating,-added",page_size:o,page:w,platforms:s});if(l=d.count||0,c=Math.ceil(l/o),d.results&&d.results.length>0){F(d.results,"games-container"),$();const f=document.getElementById("games-count");if(f){const b=(i-1)*o+1,y=Math.min(i*o,l);f.textContent=`Showing ${b}-${y} of ${l.toLocaleString()} games`}w>1&&((E=document.getElementById("games-container"))==null||E.scrollIntoView({behavior:"smooth",block:"start"}))}}catch(d){console.error("Failed to load games:",d),Q("games-container")}}function $(){const w=document.getElementById("prev-page"),E=document.getElementById("next-page"),d=document.getElementById("page-numbers");if(!w||!E||!d)return;w.disabled=i<=1,E.disabled=i>=c;let f=[];if(c<=5+2)for(let y=1;y<=Math.min(c,10);y++)f.push(y);else{f.push(1);let y=Math.max(2,i-1),B=Math.min(c-1,i+1);i<=3?B=Math.min(c-1,4):i>=c-2&&(y=Math.max(2,c-3)),y>2&&f.push("...");for(let I=y;I<=B;I++)f.push(I);B<c-1&&f.push("..."),f.push(c)}d.innerHTML=f.map(y=>y==="..."?'<span class="page-ellipsis">...</span>':`<button class="page-num ${y===i?"active":""}" data-page="${y}">${y}</button>`).join(""),d.querySelectorAll(".page-num").forEach(y=>{y.addEventListener("click",()=>{h(parseInt(y.dataset.page))})})}(M=document.getElementById("prev-page"))==null||M.addEventListener("click",()=>{i>1&&h(i-1)}),(G=document.getElementById("next-page"))==null||G.addEventListener("click",()=>{i<c&&h(i+1)}),await Promise.allSettled([h(1),z("upcoming-container",async()=>(await g.fetchGames({dates:`${n},${r}`,ordering:"released",page_size:4,platforms:s})).results||[],F),z("deals-container",async()=>(await g.fetchGames({ordering:"-rating",page_size:4,genres:"51",metacritic:"70,100",platforms:s})).results||[],F)]);const L=document.getElementById("search-btn"),p=document.getElementById("search-input");L&&L.addEventListener("click",Y),p&&p.addEventListener("keypress",w=>{w.key==="Enter"&&Y()}),Te(),Be();const v=document.getElementById("apply-filters"),m=document.getElementById("clear-filters");v==null||v.addEventListener("click",we),m==null||m.addEventListener("click",be)}async function we(){var e;const s=document.getElementById("games-container");s.innerHTML='<div class="loading"><p>Applying filters...</p></div>',_.clearFilters(),document.querySelectorAll("#platform-filters input:checked").forEach(n=>{_.currentFilters.platforms.push(n.dataset.platform)}),document.querySelectorAll("#genre-filters input:checked").forEach(n=>{_.currentFilters.genres.push(n.dataset.genre)});const t=((e=document.getElementById("sort-filter"))==null?void 0:e.value)||"";t&&(_.currentFilters.ordering=t);try{const n=await _.fetchFilteredGames();n.results&&n.results.length>0?F(n.results,"games-container"):s.innerHTML=`
                <div class="empty-state">
                    <h3>No games found</h3>
                    <p>Try adjusting your filters</p>
                </div>
            `}catch(n){console.error("Failed to apply filters:",n),s.innerHTML=`
            <div class="error-container">
                <h3>Failed to load filtered games</h3>
                <button class="btn" onclick="location.reload()">Retry</button>
            </div>
        `}}async function be(){document.querySelectorAll("#platform-filters input, #genre-filters input").forEach(e=>{e.checked=!1});const s=document.getElementById("sort-filter");s&&(s.value=""),_.clearFilters();const t=document.getElementById("games-container");t.innerHTML='<div class="loading"><p>Loading games...</p></div>';try{const e=await g.fetchGames();F(e.results,"games-container")}catch(e){console.error("Failed to reload games:",e)}}async function Ee(){document.body.id="detail-page";const t=new URLSearchParams(window.location.search).get("id");if(!t){document.querySelector(".game-detail").innerHTML=`
            <div class="error-container">
                <h2>Game Not Found</h2>
                <p>Invalid game ID. Please return to <a href="index.html">browse page</a></p>
            </div>
        `;return}const e=document.getElementById("game-title");e&&(e.textContent="Loading...");try{const n=await g.getGameDetails(t);if(!n){document.querySelector(".game-detail").innerHTML=`
                <div class="error-container">
                    <h2>Game Not Found</h2>
                    <p>We couldn't find the requested game. Please return to <a href="index.html">browse page</a></p>
                </div>
            `;return}ae(n),Se(n);try{const a=await g.getGameScreenshots(t);if(a.length>0){const r=document.getElementById("screenshots-container");r&&(r.innerHTML=a.slice(0,5).map((i,o)=>`
                        <div class="screenshot-item" data-index="${o}" data-full="${i.image}">
                            <img src="${i.image}" alt="Game screenshot" loading="lazy">
                        </div>
                    `).join(""),Ie(a.slice(0,5)))}}catch(a){console.warn("Screenshots not available:",a)}await Le(n)}catch(n){console.error("Failed to load game details:",n),document.querySelector(".game-detail").innerHTML=`
            <div class="error-container">
                <h2>❌ Failed to Load Game</h2>
                <p>${n.message||"Network error. Please try again."}</p>
                <a href="index.html" class="btn">Return to Browse</a>
                <button class="btn btn-secondary" onclick="location.reload()">Retry</button>
            </div>
        `}}function Ie(s){const t=document.getElementById("screenshot-modal"),e=document.getElementById("modal-screenshot"),n=document.getElementById("screenshot-close"),a=document.getElementById("modal-prev"),r=document.getElementById("modal-next"),i=document.getElementById("screenshot-current"),o=document.getElementById("screenshot-total");if(!t||!e)return;let l=0;o.textContent=s.length;function c(p){l=p,l<0&&(l=s.length-1),l>=s.length&&(l=0),e.src=s[l].image,i.textContent=l+1}function h(p){c(p),t.classList.add("active"),document.body.style.overflow="hidden"}function $(){t.classList.remove("active"),document.body.style.overflow=""}document.querySelectorAll(".screenshot-item").forEach((p,v)=>{p.addEventListener("click",()=>h(v))});const L=document.getElementById("game-cover");L&&s.length>0&&(L.style.cursor="pointer",L.addEventListener("click",()=>h(0))),a==null||a.addEventListener("click",()=>c(l-1)),r==null||r.addEventListener("click",()=>c(l+1)),n==null||n.addEventListener("click",$),t.addEventListener("click",p=>{p.target===t&&$()}),document.addEventListener("keydown",p=>{t.classList.contains("active")&&(p.key==="Escape"&&$(),p.key==="ArrowLeft"&&c(l-1),p.key==="ArrowRight"&&c(l+1))})}async function Le(s){if(document.getElementById("recommendations-container"))try{const e=await pe.getSimilarGames(s);e&&e.length>0?oe(e,"recommendations-container"):document.getElementById("recommendations-section").style.display="none"}catch(e){console.error("Failed to load recommendations:",e),document.getElementById("recommendations-section").style.display="none"}}function $e(){document.body.id="wishlist-page";const s=new D;X(s.getWishlist())}async function ke(){document.body.id="upcoming-page";const s=document.getElementById("games-container");s&&(s.innerHTML='<div class="loading"><div class="spinner"></div><p>Loading upcoming games...</p></div>');try{const t=new Date,e=new Date;e.setMonth(t.getMonth()+6);const n={dates:`${t.toISOString().split("T")[0]},${e.toISOString().split("T")[0]}`,ordering:"released",page_size:20},a=await g.fetchGames(n);F(a.results,"games-container"),(!a.results||a.results.length===0)&&(document.getElementById("games-container").innerHTML=`
                <div class="empty-state">
                    <h3>No upcoming releases found</h3>
                    <p>Check back later for new announcements</p>
                </div>
            `)}catch(t){console.error("Failed to load upcoming games:",t);const e=document.getElementById("games-container");e&&(e.innerHTML=`
                <div class="error-container">
                    <h3>❌ Failed to load upcoming games</h3>
                    <p>${t.message||"Please try again later."}</p>
                    <button class="btn" onclick="location.reload()">Retry</button>
                </div>
            `)}}async function Y(){const s=document.getElementById("search-input");if(!s)return;const t=s.value.trim();if(t)try{const e=await g.searchGames(t);F(e.results,"games-container"),(!e.results||e.results.length===0)&&(document.getElementById("games-container").innerHTML=`
                <div class="empty-state">
                    <h3>No games found</h3>
                    <p>Try a different search term</p>
                </div>
            `)}catch(e){console.error("Search failed:",e),document.getElementById("games-container").innerHTML=`
            <div class="error-container">
                <h3>Search failed</h3>
                <p>Please try again later.</p>
            </div>
        `}}function Se(s){const t=new D,e=document.getElementById("wishlist-btn");e&&(t.isInWishlist(s.id)?(e.classList.add("active"),e.innerHTML="<span>❤️</span> Added to Wishlist"):(e.classList.remove("active"),e.innerHTML="<span>❤️</span> Add to Wishlist"),e.dataset.gameId=s.id,e.dataset.gameName=s.name,e.dataset.gameImage=s.background_image||"")}function Te(){const s=[{id:1,name:"PC"},{id:2,name:"PlayStation"},{id:3,name:"Xbox"},{id:4,name:"Nintendo"},{id:5,name:"Mobile"}],t=document.getElementById("platform-filters");t&&(t.innerHTML=s.map(e=>`
        <label>
            <input type="checkbox" data-platform="${e.id}"> ${e.name}
        </label>
    `).join(""))}function Be(){const s=[{id:4,name:"Action"},{id:5,name:"RPG"},{id:10,name:"Strategy"},{id:2,name:"Shooter"},{id:51,name:"Indie"}],t=document.getElementById("genre-filters");t&&(t.innerHTML=s.map(e=>`
        <label>
            <input type="checkbox" data-genre="${e.id}"> ${e.name}
        </label>
    `).join(""))}async function Me(){var e;const s=document.getElementById("deals-container"),t=document.getElementById("store-filter");s&&(s.innerHTML='<div class="loading"><div class="spinner"></div><p>Loading deals...</p></div>');try{const n=await g.getStores();t&&n.length>0&&(t.innerHTML='<option value="">All Stores</option>'+n.map(a=>`<option value="${a.storeID}">${a.storeName}</option>`).join(""))}catch(n){console.warn("Could not load stores:",n)}await A(),t==null||t.addEventListener("change",A),(e=document.getElementById("sort-filter"))==null||e.addEventListener("change",A)}async function A(){const s=document.getElementById("deals-container"),t=document.getElementById("store-filter"),e=document.getElementById("sort-filter");if(s){s.innerHTML='<div class="loading"><div class="spinner"></div><p>Loading deals...</p></div>';try{const n=(t==null?void 0:t.value)||null;let a=await g.getCurrentDeals(n);const r=(e==null?void 0:e.value)||"deal";r==="price"?a.sort((i,o)=>parseFloat(i.salePrice)-parseFloat(o.salePrice)):r==="savings"&&a.sort((i,o)=>parseFloat(o.savings)-parseFloat(i.savings)),re(a,"deals-container")}catch(n){console.error("Failed to load deals:",n),s.innerHTML=`
            <div class="error-container">
                <h3>❌ Failed to load deals</h3>
                <p>${n.message||"Please try again later."}</p>
                <button class="btn" onclick="location.reload()">Retry</button>
            </div>
        `}}}async function Ge(){await V(),document.querySelectorAll(".category-btn").forEach(s=>{s.addEventListener("click",async t=>{document.querySelectorAll(".category-btn").forEach(n=>n.classList.remove("active")),t.target.classList.add("active");const e=t.target.dataset.category;await V(e)})})}async function V(s=null){const t=document.getElementById("free-games-container");if(t){t.innerHTML='<div class="loading"><div class="spinner"></div><p>Loading free games...</p></div>';try{const e=await g.getFreeToPlayGames(s);ie(e,"free-games-container")}catch(e){console.error("Failed to load free games:",e),t.innerHTML=`
            <div class="error-container">
                <h3>❌ Failed to load free games</h3>
                <p>${e.message||"Please try again later."}</p>
                <button class="btn" onclick="location.reload()">Retry</button>
            </div>
        `}}}async function Fe(){const s=document.getElementById("compare-search"),t=document.getElementById("compare-search-btn"),e=document.getElementById("search-results");t==null||t.addEventListener("click",async()=>{const n=s==null?void 0:s.value.trim();if(n){e.innerHTML="<p>Searching...</p>";try{const a=await g.searchGames(n);a.results&&a.results.length>0?(e.innerHTML=a.results.slice(0,5).map(r=>`
                    <div class="search-result-item" data-game-id="${r.id}">
                        <img src="${r.background_image||"https://via.placeholder.com/50x50"}" alt="${r.name}">
                        <span>${r.name}</span>
                        <button class="btn-small add-to-compare">Add</button>
                    </div>
                `).join(""),e.querySelectorAll(".add-to-compare").forEach(r=>{r.addEventListener("click",async i=>{const l=i.target.closest(".search-result-item").dataset.gameId,c=await g.getGameDetails(l),h=H.addGame(c);h.success?(ce(c,h.slot),J(),e.innerHTML="",s.value=""):alert(h.message)})})):e.innerHTML="<p>No games found</p>"}catch{e.innerHTML="<p>Search failed. Try again.</p>"}}}),s==null||s.addEventListener("keypress",n=>{n.key==="Enter"&&(t==null||t.click())}),document.querySelectorAll(".comparison-slot").forEach((n,a)=>{n.addEventListener("click",r=>{r.target.classList.contains("remove-game")&&(H.removeGame(a),n.innerHTML=`
                    <div class="slot-empty">
                        <span>+</span>
                        <p>Add Game</p>
                    </div>
                `,J())})})}function J(){const s=document.getElementById("comparison-table"),t=H.getComparisonData();if(!t||t.games.length<2){s.style.display="none";return}s.style.display="block",le(t)}
