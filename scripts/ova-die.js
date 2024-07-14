export default class OVADie extends Die {
    constructor(termData = {}) {
        super(termData);
        Die.MODIFIERS['khs'] = 'keepHighestSum';
    }

    keepHighestSum(modifier) {
        // sum same this.results
        let oneCount=0
        
        const dieSum = this.results;

        dieSum.forEach(die =>{
            if (die.result==1)
            {
                oneCount++
                die.discarded=true;
                die.active=false
            }    
        })  
        //Cancel highest        
        let nh=0
        for(let i=0;i<oneCount;i++)
        {
            nh=0
            for(let l=0;l<dieSum.length;l++)
            {
                if(dieSum[l].result>dieSum[nh].result&&dieSum[l].active)
                    nh=l
            }    
            dieSum[nh].discarded = true
            dieSum[nh].active = false
        }    
       //Calculate Matches
       let highest=0
       let hightotal=0
       let ttemp=0
       for(let i=1;i<7;i++)
       {
         ttemp=0
         dieSum.forEach(die=>{
            if(die.result==i&&die.active)
             ttemp+=i   
         })
        if(ttemp>hightotal) 
        {
          hightotal = ttemp
          highest = i
        } 
       }
       dieSum.forEach(die=>{
        if(die.result!=highest)
        {
            die.active=false
            die.discarded=true
        }    
       })
}
}