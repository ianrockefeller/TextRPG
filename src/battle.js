
/*
	stat = physical damage of attacker
	DM = damage constant
	formula:
	[{(Stat^3 / 32) + 32} * DmCon / 16]
*/
function baseDamageFormula(DM, stat) {
	var ret = floor((pow(stat, 3) / 32 + 32) * DM / 16);

	return ret > 99999 ? 99999 : ret;
}

/*
	formula:
	[DmCon * ([Stat ^ 2 ÷ 6] + DmCon) ÷ 4]
*/
function baseMagicFormula(DM, stat) {
	var ret = floor(DM * (floor(pow(stat,2) / 6) + DM) / 4);
	return ret > 99999 ? 99999 : ret;
}

/*
	def = defense of the player being attacked
	formula:
	[{(Def - 280.4)^2} ÷ 110] + 16
*/
function defenseFormula(def) {
	return floor(floor(pow(def - 280.4, 2)) / 110 + 16);
}

/*
	Combining last two functions..
	formula:
	[Dmg * DefNum ÷ 730]
*/
function damageReductionFormula(dmg, defnum) {
	return floor(dmg * defnum / 730)
}

/*
	used against both def and mdef
	Final Damage = Base Damage * {730 - (Def * 51 - Def^2 ÷ 11) ÷ 10} ÷ 730
*/
function physicalFinalDamageFormula(DM, stat, def) {
	return floor(damageReductionFormula(baseDamageFormula(DM, stat), defenseFormula(def)) * (730 - floor((def * 51 - floor(pow(def,2) / 11)) / 10)) / 730);
}

function magicFinalFormula(DM, stat, def) {
	return floor(damageReductionFormula(baseMagicFormula(DM, stat), defenseFormula(def)) * (730 - floor((def * 51 - floor(pow(def,2) / 11)) / 10)) / 730);
}

/*
	formula:
	HlCon * [(Stat + HlCon) ÷ 2]
*/
function healFormula(HL, stat) {
	return HL * floor((stat + HL) / 2);
}


/*

NOTES:
-constants depend by weapon/attack type and spell

*/







