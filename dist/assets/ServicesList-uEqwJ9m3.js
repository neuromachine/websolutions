import{c as s,a as t,d as a,t as e,F as l,e as v,o as b,p as w,s as k,u as T,h as I,b as q,v as B,f as g}from"./index-BBpyiTWQ.js";import{_ as h,H as C}from"./Header-WsYp0V2C.js";import{u as $}from"./mainStore-D6YxRKDy.js";import{P as N}from"./PageTitle-CDan7iIT.js";import"./portfolio-BFmaLcke.js";import"./data-BoXbxPBD.js";const x="/assets/img/choose-1.png",L="/assets/img/choose-2.png",M={class:"subitems"},P={class:"lv3"},R={class:"lv3"},U={class:"lv3"},D={__name:"OverlayItem",props:{data:{type:Object,required:!0}},emits:["close"],setup(f,{emit:i}){const n=f,p=i,d=()=>p("close","message out");return(o,u)=>(t(),s("div",null,[a("div",null,e(n.data.title),1),(t(!0),s(l,null,v(n.data.childs,(c,m)=>(t(),s("p",{key:m},[a("span",null,[a("h3",null,e(c.title),1)]),a("ul",M,[(t(!0),s(l,null,v(c.childs,(r,_)=>(t(),s("li",{key:_},[a("span",null,e(r.title),1),a("span",P,e(r.thumb),1),a("span",R,e(r.id),1),a("span",U,e(r.slug),1),(t(!0),s(l,null,v(r.childs,(S,y)=>(t(),s("span",{key:y,class:"lv3"},e(S.title),1))),128))]))),128))])]))),128)),a("button",{type:"button",onClick:d},"Close")]))}},F=["id"],O={class:"single-services-item"},V={class:"module"},Y={class:"subitems"},A={class:"schild"},H={class:"title"},W={class:"lv3"},j={class:"lv3"},E={class:"lv3"},G={__name:"ServiceItem",props:{id:{type:String,required:!0},title:{type:String,required:!0},slug:{type:String,required:!0},childs:{type:Array,required:!0}},setup(f){const i=f;function n(){k(D,{title:"INFO",params:{data:i}})}return b(()=>{}),(p,d)=>(t(),s("div",{id:"serviceitem_"+i.id,class:"col-lg-4 col-md-6"},[a("div",O,[d[1]||(d[1]=a("div",{class:"services-icon"},[a("i",{class:"flaticon-development"})],-1)),a("h3",{class:"owner",onClick:n},e(i.title),1),(t(!0),s(l,null,v(i.childs,(o,u)=>(t(),s("div",{key:u},[a("div",V,e(o.title),1),a("ul",Y,[(t(!0),s(l,null,v(o.childs,(c,m)=>(t(),s("li",{key:m},[a("div",A,[a("span",H,e(c.title),1),a("span",W,e(c.thumb),1),a("span",j,e(c.id),1),a("span",E,e(c.slug),1)]),(t(!0),s(l,null,v(c.childs,(r,_)=>(t(),s("span",{key:_,class:"lv3"},e(r.title),1))),128))]))),128))])]))),128)),a("div",{class:"services-btn"},[a("span",{class:"read-more",onClick:n},d[0]||(d[0]=[a("i",{class:"bi bi-arrow-right-short"},null,-1),w(" Подробнее ")]))])])],8,F))}},z=h(G,[["__scopeId","data-v-c27d1e23"]]),J={class:"services-section section-padding"},K={class:"container"},Q={class:"row"},X={__name:"Services",setup(f){T();const i=$(),n=I(()=>i.geyServicesTree(i.data.tree));return(p,d)=>(t(),s(l,null,[a("section",J,[a("div",K,[a("div",Q,[(t(!0),s(l,null,v(n.value,(o,u)=>(t(),B(z,{key:u,id:o.id,title:o.title,childs:o.childs,slug:o.slug},null,8,["id","title","childs","slug"]))),128))])])]),d[0]||(d[0]=q('<section class="hire-section" data-v-9fda32f0><div class="container" data-v-9fda32f0><div class="row" data-v-9fda32f0><div class="col-lg-8 offset-lg-2 col-md-12" data-v-9fda32f0><div class="hire-content" data-v-9fda32f0><h6 class="sub-title" data-v-9fda32f0>Want to work with us?</h6><h2 data-v-9fda32f0>Digitally Transform &amp; Grow Your Business</h2><p data-v-9fda32f0>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud consectetur voluptatem accusantium doloremque adipiscing elit.</p><div class="hire-btn" data-v-9fda32f0><a class="default-btn" href="tel:12345678" data-v-9fda32f0>Call Now<span data-v-9fda32f0></span></a><a class="default-btn-one" href="contact.html" data-v-9fda32f0>Contact Us<span data-v-9fda32f0></span></a></div></div></div></div></div></section><section class="overview-section section-padding" data-v-9fda32f0><div class="container" data-v-9fda32f0><div class="row align-items-center" data-v-9fda32f0><div class="col-lg-6" data-v-9fda32f0><div class="overview-image" data-v-9fda32f0><img src="'+x+'" alt="image" data-v-9fda32f0></div></div><div class="col-lg-6" data-v-9fda32f0><div class="overview-content" data-v-9fda32f0><h6 class="sub-title" data-v-9fda32f0>Why Choose Us?</h6><h2 data-v-9fda32f0>Safeguard Your Brand with Cyber Security and IT Solutions</h2><p data-v-9fda32f0>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul class="features-list" data-v-9fda32f0><li data-v-9fda32f0><span data-v-9fda32f0>Remote IT Assistance</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Cloud Services</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Managed IT Service</span></li><li data-v-9fda32f0><span data-v-9fda32f0>IT Security Services</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Practice IT Management</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Solving IT Problems</span></li></ul></div></div></div></div></section><section class="overview-section pt-50 pb-100" data-v-9fda32f0><div class="container" data-v-9fda32f0><div class="row align-items-center" data-v-9fda32f0><div class="col-lg-6" data-v-9fda32f0><div class="overview-content" data-v-9fda32f0><h6 class="sub-title" data-v-9fda32f0>WHY TRUST US?</h6><h2 data-v-9fda32f0>Achieve Digital Transformation For Your Retail Business Services</h2><p data-v-9fda32f0>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul class="features-list" data-v-9fda32f0><li data-v-9fda32f0><span data-v-9fda32f0>Protect your Business</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Network Security</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Data Security</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Small Business Owners</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Running your Business</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Network Monitoring</span></li></ul></div></div><div class="col-lg-6" data-v-9fda32f0><div class="overview-image-2" data-v-9fda32f0><img src="'+L+'" alt="image" data-v-9fda32f0></div></div></div></div></section>',3))],64))}},Z=h(X,[["__scopeId","data-v-9fda32f0"]]),la={__name:"ServicesList",setup(f){return(i,n)=>(t(),s(l,null,[g(C),g(N,{breadcrumbs:[{title:"Главная",link:"/"},{title:"Услуги",link:"/services"}]}),g(Z)],64))}};export{la as default};
