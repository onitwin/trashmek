module.exports={
	rollDice:(number=1,range=6)=>{
		const resultsArray=[]
	for(let i=0; i < number; i++){
		resultsArray.push(Math.floor(Math.random() * range) + 1);
	}
	return resultsArray;
	}
}