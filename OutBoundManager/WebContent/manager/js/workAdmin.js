_Base.skin = "default";
_Base._load();

function initialize() {
	_uibInitialize();

	{
		_imgSetSrc("imgBackground", getHref(_Base._PathResourceImg + "1001.jpg"));
		_divSetPosition("divInfo", "absolute", 10, 40);
	}

	initializeAccordion();

	initializeTab();
}
