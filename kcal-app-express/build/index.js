var n=(e,o)=>()=>(o||e((o={exports:{}}).exports,o),o.exports);var S=n(A=>{A.settings={logLevel:"debug"}});var p=n((fe,D)=>{var s=require("winston"),M=S(),I={debug:"blue",info:"green",warn:"yellow",error:"red"},j=s.format.combine(s.format.cli({colors:I}),s.format.timestamp({format:"YYYY-MM-DD - hh:mm:ss - SSS"}),s.format.align(),s.format.printf(e=>`${e.timestamp} ${e.level}: ${e.message}`)),c=s.createLogger({level:M.settings.logLevel,format:j,transports:[new s.transports.Console]});s.addColors(I);var R=c.log;c.log=(e,o)=>{Object.prototype.toString.call(o)==="[object Error]"?R.call(c,e,o.toString()):R.call(c,e,o)};D.exports=c});var _=n((pe,C)=>{function B(e){return`${e.charAt(0)==="/"?"":"/"}${e}`}C.exports={withSlash:B}});var q=n((Ee,h)=>{function Y(e,o,t){let r=["foodName","kcal","fat","saturatedFat","carbs","sugar","fiber","protein"],L=["string","number","number","number","number","number","number","number"],b=Object.keys(e),u=r.filter(i=>!b.includes(i));u.length&&t(`Some reqired props are missing: ${u}`);let f=r.filter(i=>!e[i]);f.length&&t(`Some reqired props are empty: ${f}`);let $=r.filter((i,P)=>typeof e[i]!==L[P]);$.length&&t(`Some props have incorrect type: ${$}`),o()}h.exports={validateNewFood:Y}});var N=n((Te,y)=>{var V=`
    CREATE TABLE IF NOT EXISTS food (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        foodName VARCHAR(255) NOT NULL,
        kcal INTEGER NOT NULL,
        fat REAL NOT NULL,
        saturatedFat REAL NOT NULL,
        carbs REAL NOT NULL,
        sugar REAL NOT NULL,
        fiber REAL NOT NULL,
        protein REAL NOT NULL
    )
`,G=`
    INSERT INTO food (foodName, kcal, fat, saturatedFat, carbs, sugar, fiber, protein)
    VALUES ('Coocked Broccoli', 35, 4, 0, 7.2, 1.4, 3.3, 2.4),
           ('Lemon Chicker', 226, 11.8, 1.9, 19.1, 8.7, 1.1, 10.8),
           ('Corn', 106, 2.1, 1.1, 21.9, 0, 0, 3.1),
           ('Sushi Salmon', 180, 8.1, 1.8, 13, 2, 0, 13)
`,H="SELECT COUNT(*) as cnt FROM food",K="SELECT * FROM food",W=(e,o,t,r,L,b,u,f)=>`
    INSERT INTO food (foodName, kcal, fat, saturatedFat, carbs, sugar, fiber, protein)
    VALUES ('${e}', ${o}, ${t}, ${r}, ${L}, ${b}, ${u}, ${f})
`,X=e=>`
    DELETE FROM food
    WHERE id = ${e}
`;y.exports={CREATE_TABLE_FOOD:V,COUNT_FOOD:H,SELECT_ALL_FOODS:K,INSERT_INITIAL_DATA:G,INSERT_FOOD:W,DELETE_FOOD:X}});var w=n((Le,U)=>{var l=p(),O=N();function z(e){l.info("Insert initial data into the database"),e.run(O.INSERT_INITIAL_DATA,o=>{o&&l.error(`Failed to insert initial data! ${o}`)})}function J(e,o){e.all(O.COUNT_FOOD,(t,r)=>{if(t){l.error(`Failed to count foods in food table. ${t}`);return}r[0].cnt===0&&(l.info("Food table is empty!"),o(e))})}function Q(e){e.run(O.CREATE_TABLE_FOOD,o=>{if(o){l.error(`Failed to create food table. ${o}`);return}J(e,z)})}U.exports={createFoodTable:Q}});var k=n((be,v)=>{var g=p(),m=N();function Z(e,o){o.all(m.SELECT_ALL_FOODS,(t,r)=>{if(t){g.error(`Failed to select foods from food table. ${t}`),e.status(500).send(t);return}e.send(r)})}function ee(e,o,t){o.run(m.INSERT_FOOD(t.foodName,t.kcal,t.fat,t.saturatedFat,t.carbs,t.sugar,t.fiber,t.protein),r=>{if(r){g.error(`Faield to insert new food. ${r}`),e.status(500).send(r);return}e.send()})}function oe(e,o,t){o.run(m.DELETE_FOOD(t),r=>{if(r){g.error(`Failed to delete food. ${r}`),e.status(500).send(r);return}e.send()})}v.exports={getAllFoods:Z,addNewFood:ee,deleteFood:oe}});var F=require("express"),te=require("sqlite3"),re=require("cors"),d=p(),{withSlash:se}=_(),{validateNewFood:ne}=q(),{createFoodTable:ae}=w(),{getAllFoods:ie,addNewFood:ce,deleteFood:le}=k(),a=F(),x=process.env.PORT||8080,E=se(process.env.BASE_PATH||"kcal-app"),T=new te.Database(process.env.DB||"db/food.db");a.use(re());a.use(F.urlencoded({extended:!0}));a.use(F.json());a.listen(x,()=>{d.info(`KCal app server is up. Listens on port: '${x}' base path: '${E}'.`),ae(T)});a.get(`${E}/food`,(e,o)=>{d.debug(`GET ${e.url}`),ie(o,T)});a.post(`${E}/food`,(e,o)=>{d.debug(`POST ${e.url} ${e.body}`),ne(e.body,()=>ce(o,T,e.body),t=>{d.info({message:t}),o.status(400).send(t)})});a.delete(`${E}/food/:id`,(e,o)=>{d.debug(`DELETE ${e.url}`),le(o,T,e.params.id)});
