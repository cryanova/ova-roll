class OVARoller extends Roll 
{
  constructor(termData = {})
  {
    console.log("Here");
    super(termData);
  }  
 async evaluate()
  {
    let matchies= false
    let negative=false
    if (this.formula.substr(0,3) == "OVA")
    {  

     let res = this 
     let sub = this.formula;
     sub = sub.substr(3).trim();
     sub= sub.replace(" ","")
     console.log(sub)
     negative = parseInt(sub)<1     
     if (negative==true)
     {
     this.terms[0].term = Math.abs(sub)+"d6kl"
     this._formula = Math.abs(sub)+"d6kl"
     console.log(Math.abs(sub)+"d6kl")
     }
     else
     { 
     this.terms[0].term = Math.abs(sub)+"d6"
     this._formula = Math.abs(sub)+"d6"
     }  
     console.log(this)    
     matchies=true

    } 
    let res = await super.evaluate();
    if (matchies==true)
    {    
      if (negative==false)
      {
         let newTotal = 0;
    let highMatch = 0;
    let oneCount=0
    let m=res.dice[0].results;
    m.forEach( e =>{
        if (e.result==1) 
        {    
           e.active=false
           e.discarded=true
           oneCount++
        }   
    })
    for (let i=0;i<oneCount;i++)
    {
    let highest=0
     for (let l=0;l<m.length;l++)
     {
        if (m[l].result>m[highest].result&&m[l].active==true)
         {
            highest = l
         }   

     }
     m[highest].active=false; 
     m[highest].discarded=true;       
    }    
    for (let l=1;l<7;l++)
    {  
    let tTotal=0      
    for (let i=0;i<m.length;i++)
      {
      
      if(m[i].active==true&&m[i].result==l) tTotal+=l;

      }
      if (tTotal>newTotal)
         {
            newTotal = tTotal
            highMatch = l 
        }   
    }       
    res._total = newTotal;
    m.forEach(e=>{
      if(e.result!=highMatch) e.discarded=true
    })
    if (newTotal==0)
      res._formula =`CRITICAL FAILURE!`
    else      
      res._formula = `Rolled ${m.length} dice. Highest match = ${highMatch}`
    }
    else
    {
      res._total+=2
      res._formula = `Rolled ${res.dice[0].results.length} negative dice!`
    }
    }
    res._evaluated = true;
    return res
}
fromData()
{
   if (this.formula.includes("Rolled"))
      this._evaluated = true
   else
     super.fromData();
}
}