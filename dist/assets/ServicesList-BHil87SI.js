import{_ as m}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{h as S,c as s,a as t,d as a,t as d,F as n,e as c,f,w,i as b,u as y,j as k,b as T,k as B}from"./index-CwXhQ7LS.js";import{u as I}from"./mainStore-BZMD1w3_.js";import{P as q}from"./PageTitle-Dgy3YZvu.js";import{H as x}from"./Header-DaIMUhYO.js";import"./portfolio-BFmaLcke.js";import"./data-BoXbxPBD.js";const C="/assets/img/choose-1.png",L="/assets/img/choose-2.png",N=["id"],R={class:"single-services-item"},P={class:"subitems"},U={class:"lv3"},$={class:"lv3"},D={class:"lv3"},M={class:"services-btn"},V={__name:"ServiceItem",props:{id:{type:String,required:!0},title:{type:String,required:!0},slug:{type:String,required:!0},childs:{type:Array,required:!0}},setup(v){const e=v;return(u,l)=>{const r=S("RouterLink");return t(),s("div",{id:"serviceitem_"+e.id,class:"col-lg-4 col-md-6"},[a("div",R,[l[1]||(l[1]=a("div",{class:"services-icon"},[a("i",{class:"flaticon-development"})],-1)),a("h3",null,d(e.title),1),(t(!0),s(n,null,c(e.childs,(i,p)=>(t(),s("p",{key:p},[a("span",null,[a("h3",null,d(i.title),1)]),a("ul",P,[(t(!0),s(n,null,c(i.childs,(o,g)=>(t(),s("li",{key:g},[a("span",null,d(o.title),1),a("span",U,d(o.thumb),1),a("span",$,d(o.id),1),a("span",D,d(o.slug),1),(t(!0),s(n,null,c(o.childs,(_,h)=>(t(),s("span",{key:h,class:"lv3"},d(_.title),1))),128))]))),128))])]))),128)),a("div",M,[f(r,{to:{path:"/service/"+e.slug},class:"read-more"},{default:w(()=>l[0]||(l[0]=[a("i",{class:"bi bi-arrow-right-short"},null,-1),b(" Подробнее ")])),_:1},8,["to"])])])],8,N)}}},Y=m(V,[["__scopeId","data-v-10fa4168"]]),A={class:"services-section section-padding"},F={class:"container"},H={class:"row"},W={__name:"Services",setup(v){y();const e=I(),u=k(()=>e.geyServicesTree(e.data.tree));return(l,r)=>(t(),s(n,null,[a("section",A,[a("div",F,[a("div",H,[(t(!0),s(n,null,c(u.value,(i,p)=>(t(),B(Y,{key:p,id:i.id,title:i.title,childs:i.childs,slug:i.slug},null,8,["id","title","childs","slug"]))),128))])])]),r[0]||(r[0]=T('<section class="hire-section" data-v-9fda32f0><div class="container" data-v-9fda32f0><div class="row" data-v-9fda32f0><div class="col-lg-8 offset-lg-2 col-md-12" data-v-9fda32f0><div class="hire-content" data-v-9fda32f0><h6 class="sub-title" data-v-9fda32f0>Want to work with us?</h6><h2 data-v-9fda32f0>Digitally Transform &amp; Grow Your Business</h2><p data-v-9fda32f0>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud consectetur voluptatem accusantium doloremque adipiscing elit.</p><div class="hire-btn" data-v-9fda32f0><a class="default-btn" href="tel:12345678" data-v-9fda32f0>Call Now<span data-v-9fda32f0></span></a><a class="default-btn-one" href="contact.html" data-v-9fda32f0>Contact Us<span data-v-9fda32f0></span></a></div></div></div></div></div></section><section class="overview-section section-padding" data-v-9fda32f0><div class="container" data-v-9fda32f0><div class="row align-items-center" data-v-9fda32f0><div class="col-lg-6" data-v-9fda32f0><div class="overview-image" data-v-9fda32f0><img src="'+C+'" alt="image" data-v-9fda32f0></div></div><div class="col-lg-6" data-v-9fda32f0><div class="overview-content" data-v-9fda32f0><h6 class="sub-title" data-v-9fda32f0>Why Choose Us?</h6><h2 data-v-9fda32f0>Safeguard Your Brand with Cyber Security and IT Solutions</h2><p data-v-9fda32f0>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul class="features-list" data-v-9fda32f0><li data-v-9fda32f0><span data-v-9fda32f0>Remote IT Assistance</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Cloud Services</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Managed IT Service</span></li><li data-v-9fda32f0><span data-v-9fda32f0>IT Security Services</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Practice IT Management</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Solving IT Problems</span></li></ul></div></div></div></div></section><section class="overview-section pt-50 pb-100" data-v-9fda32f0><div class="container" data-v-9fda32f0><div class="row align-items-center" data-v-9fda32f0><div class="col-lg-6" data-v-9fda32f0><div class="overview-content" data-v-9fda32f0><h6 class="sub-title" data-v-9fda32f0>WHY TRUST US?</h6><h2 data-v-9fda32f0>Achieve Digital Transformation For Your Retail Business Services</h2><p data-v-9fda32f0>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul class="features-list" data-v-9fda32f0><li data-v-9fda32f0><span data-v-9fda32f0>Protect your Business</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Network Security</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Data Security</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Small Business Owners</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Running your Business</span></li><li data-v-9fda32f0><span data-v-9fda32f0>Network Monitoring</span></li></ul></div></div><div class="col-lg-6" data-v-9fda32f0><div class="overview-image-2" data-v-9fda32f0><img src="'+L+'" alt="image" data-v-9fda32f0></div></div></div></div></section>',3))],64))}},j=m(W,[["__scopeId","data-v-9fda32f0"]]),X={__name:"ServicesList",setup(v){return(e,u)=>(t(),s(n,null,[f(x),f(q,{breadcrumbs:[{title:"Главная",link:"/"},{title:"Услуги",link:"/services"}]}),f(j)],64))}};export{X as default};
