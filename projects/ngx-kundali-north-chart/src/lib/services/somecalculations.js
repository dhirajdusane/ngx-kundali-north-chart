function normalizeTo12(index){
	if(index > 12) return index - 12 ;
	else return index;
}

function getArudhaPada (houseNumber, planetIndex) {
    return normalizeTo12(((planetIndex - houseNumber) + planetIndex))
}	
	
function argala (planetIndex, isVakri) {
	let argala = [2,4,5,11];
	for ( let i = 0; i < 4 ; i++ ) {
		argala[i] = normalizeTo12(planetIndex - 1 + argala[i]);
	}
	return argala;
}

function virodhArgala (planetIndex) {
	let argala = [12,10,3];
	for ( let i = 0; i < 3 ; i++ ) {
		argala[i] = normalizeTo12(planetIndex - 1 + argala[i]);
	}
	return argala;
}


const days = { 
        SUNDAY: 0, 
        MONDAY: 1, 
        TUESDAY: 2, 
        WEDNESDAY: 3, 
        THURSDAY: 4, 
        FRIDAY: 5, 
        SATURDAY: 6 
    }
	
const planets = { 
    Sun: 1, 
    Moon: 2, 
    Merquery: 3, 
    Venus: 4, 
    Mars: 5, 
    Jupiter: 6, 
    Saturn: 7 ,
	Rahu: 8,
	Ketu: 9 
}; 


function grahaDrishti (grahaLocationIndex, planetEnum) {
	grahaDrishti = []
	switch(planetEnum){
		case 1:		
		case 2:		
		case 3:		
		case 4:
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 7))
		break;
		
		case 5:
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 4));
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 7))
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 8));
		break;
		
		case 7:
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 3));
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 7))
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 10));
		break;

		case 6:	
		case 8:		
		case 9:
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 5));
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 7))
		grahaDrishti.push(normalizeTo12(grahaLocationIndex - 1 + 9));
		break;
	}
	
	return grahaDrishti;
}

