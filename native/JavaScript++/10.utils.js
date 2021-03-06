 ///http://jsonviewer.stack.hu/

if(!this['jsppCallback']) this.jsppCallback = function(){};
if(!this['window']) this.window = {};
if(!this['console']) console = { log:function(m){/*trace("@@"+m)*/} }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ____JSONtoXML(json, rootNode)
{
	if(!rootNode) rootNode = "XML";
	
	var ____isArray 	= function(obj) {return (Object.prototype.toString.apply(obj) === '[object Array]');}
	var ____isObject	= function(obj) {return (Object.prototype.toString.apply(obj) === '[object Object]');}
	var ____isFunction	= function(obj) {return (Object.prototype.toString.apply(obj) === '[object Function]');}
	
	var obj = (typeof json == 'string') ? JSON.parse(json) : json;

	var xml = "<" + rootNode + ">" +
			  __JSONtoXML(obj) +
			  "</" + rootNode + ">";

	function __addItem(v,k)
	{
		var x = '';

		if(v==null)
			x= "<" + k + ">null</" + k + ">";
		else
		{
			switch(typeof v)			
			{
				case 'object':								
					x= "<" + k + ">" + __JSONtoXML(v) + "</" + k + ">";
					break;
					
				case 'string':
					x= "<" + k + "><![CDATA[" + v + "]]></" + k + ">";
					break;
						
				default:
					x= "<" + k + ">" + v + "</" + k + ">";
					break;
			}
		}

		return x;
	}
			  
	function __JSONtoXML(obj)
	{			  
		var x = '';
		
		if(____isArray(obj))
		{
			for(var i=0;i<obj.length;i++)
			{
				var v = obj[i];				
				var k = '_' + i;				
				x+= __addItem(v,k);
			}
		}
		else
		{
			for(var k in obj)
			{
				var v = obj[k];				
				if(!isNaN(k)) k = '_' + k;
				x+= __addItem(v,k);
			}
		}			
				
		return x;
	}
	
	return xml;
}
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function compileJSPP(file, code, _debug, _nowrap, _warnings, _xml)
{
	try
	{				
		if (file == null) file = "(no-file)";

		if (_xml == null) _xml = true;
		if (_debug == null) _debug = true;
		if (_nowrap == null) _nowrap = true;
		if (_warnings == null) _warnings = true;
		
		var options =
		{
			debug: _debug,
			nowrap: _nowrap,
			warnings: _warnings,
			symbols: true
		};
		
		var ast, c, gen, cs;
                
        // First pass
		ast = narcissus.jsparse(code, file);
		c = new compiler(ast, options);
		c.preprocess(ast, false);		
		gen = c.compile();         
		cs = [].concat(c.SymbolTable.codeSymbols);
		c = null;
		
		// Second pass      
		c = new compiler(ast, options);
		c.preprocess(ast, true);		
		c.SymbolTable.codeSymbols = cs;
		gen = c.compile();
				
		// Cleanup generated code of empty scopes.
		gen = RxReplace(gen, "var _bScope\\d+\\=\\{\\};[\\s\\n\\r]*", "mg", "");
		gen = RxReplace(gen, "_bScope\\d+\\=null;[\\s\\n\\r]*", "mg", "");
		gen = RxReplace(gen, "var _bScopeStmt\\d+\\=\\{\\};[\\s\\n\\r]*", "mg", "");
		gen = RxReplace(gen, "_bScopeStmt\\d+\\=null;[\\s\\n\\r]*", "mg", "");
		
		// Split generated code into modules.
		var module, rx_modules = new RegExp("//@line (\\d+)\n+\\x22script_begin\\:///([^\\x22]+)\\x22;([.\\W\\w\\n\\N]*?)//@line (\\d+)\n+\\x22script_end\\:///([^\\x22]+)\\x22;", "mg");
		while((module = rx_modules.exec(gen)) !== null) 
		{
			// Get filename.
			var file = module[2];
			module = module[3];
			
			// Beutify and further clean-up modules.			
			module = RxReplace(module, ";[\\s\\t]+//@line ", "mg", ";\n//@line ");
			module = do_js_beautify(module, 1, true, true, true);						
           	module = RxReplace(module, "//@line undefined[\\s\\n\\r]+;[\\s\\n\\r]+", "mg", "");
            module = RxReplace(module, "^([\\t]*)\\{\\x20+//@line", "mg", "$1{\n$1\t//@line");
            module = RxReplace(module, "^([\\t]*)\\}\\x20+//@line", "mg", "$1}\n$1//@line");
            module = RxReplace(module, "([:=])\\s*\\{[\\s\\t\\r\\n]*\\}", "mg", "$1 {}");
            module = RxReplace(module, "return[\\s\\n\\r]+//@line NaN[\\s\\n\\r]+;", "mg", "return;");			
            module = RxReplace(module, "\\n\\n", "m", "");
            
            // Output module.						
		    jsppCallback("module", file, module);		    		   
		}
		
		stripNodeFromCyclicReferences(c.errors);			
		stripNodeFromCyclicReferences(c.warnings);			
		stripNodeFromCyclicReferences(c.SymbolTable.debugSymbols);			
		stripNodeFromCyclicReferences(c.SymbolTable.codeSymbols);
		stripNodeFromCyclicReferences(c.SymbolTable.scopeTable);		
		 
		/*
		function CleanSymbol(n)
		{ 
			//if(!n) return;
			for(i in n)
			{ 
				switch(i)
				{
				case "start":
				case "end":
				case "lineno":
				case "scopeId":
				case "classId":
					n[i]=undefined;				
					break;
				}               
				if(n[i] instanceof Object)
				  CleanSymbol(n[i]);
			}
		} 
		for(i in c.SymbolTable.codeSymbols)
		{ 
			if(!isFinite(i))continue;
			var item = c.SymbolTable.codeSymbols[i];
			if(item.type=="CLASS")
			{
				CleanSymbol(item);
				var json = JSON.stringify(item);
				json = RxReplace(json, "ECMA", "mg", "");
				json = RxReplace(json, "__", "mg", "");
				trace(json);
			}
		}
		*/		
		
		c.SymbolTable.debugSymbols = JSON.stringify(c.SymbolTable.debugSymbols);
		c.SymbolTable.codeSymbols = JSON.stringify(c.SymbolTable.codeSymbols);
		c.SymbolTable.scopeTable = JSON.stringify(c.SymbolTable.scopeTable);
		
		jsppCallback("errors", _xml ? ____JSONtoXML(c.errors) : JSON.stringify(c.errors) );
		jsppCallback("warnings", _xml ? ____JSONtoXML(c.warnings) : JSON.stringify(c.warnings) );				
		jsppCallback("debugSymbols", _xml ? ____JSONtoXML(c.SymbolTable.debugSymbols) : c.SymbolTable.debugSymbols );				
		jsppCallback("codeSymbols", _xml ? ____JSONtoXML(c.SymbolTable.codeSymbols) : c.SymbolTable.codeSymbols );
		jsppCallback("codeScopes", _xml ? ____JSONtoXML(c.SymbolTable.scopeTable) : c.SymbolTable.scopeTable );		
		
		//trace( "=== DEBUG SYMBOLS ===\n" + c.SymbolTable.debugSymbols.replace(/\},\{/mg, "}\n{") + "\n\n" );		
		//trace( "=== CODE SYMBOLS ===\n" + c.SymbolTable.codeSymbols.replace(/\},\{/mg, "}\n{") + "\n\n" );				
		//trace( "=== SCOPE TABLE ===\n" + JSON.stringify(c.SymbolTable.scopeTable).replace(/\},\{/mg, "}\n{") + "\n\n" );
		
		trace("Code generation Done.");
		
		return gen;		
	}
	catch(e)
	{
		trace("ERROR: " +e);
	}
} 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TRACE(n)
{
	trace(JSON.stringify( stripNodeFromCyclicReferences(n)));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function stripNodeFromCyclicReferences(node)
{
	for(key in node)
	{
		switch(key)
		{
			case "tokenizer":				
			case "parent":
			case "target":
			case "parentObject":
				node[key] = null;
				continue;
				break;
		}
		
		var item = node[key];	
		if(item instanceof Object)
			stripNodeFromCyclicReferences(item);
	}			
	return node;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RxReplace(buff, patt, opts, repl)
{
	var rx = new RegExp(patt, opts);
	var res = buff.replace(rx, repl);
	return res;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ____readSourceFiles()
{
	var buff = "";
	var root = "D:/mobileFX/Projects/Software/Coconut/Projects/Leonidas.project/web";	
	//var list = files(root, ".*?(js|jspp)$");	
	//list = eval(list);
	var list =
	["/src/externs/CRL_native.js",
	"/src/externs/ECMA.jspp",
	"/src/org/Coconut2D/Constants.js",
	"/src/org/Coconut2D/Coconut.js",
	"/src/org/Coconut2D/html5/HTML5.js",
	"/src/org/Coconut2D/html5/HTMLCanvas.js",
	"/src/org/Coconut2D/html5/HTMLEvents.js",
	"/src/org/Coconut2D/html5/WebGL.js",
	"/src/org/Coconut2D/anim/CocoSequence.jspp",
	"/src/org/Coconut2D/anim/CocoImage.jspp",
	"/src/org/Coconut2D/anim/CocoSound.jspp",
	"/src/org/Coconut2D/anim/CocoTimeLabel.jspp",
	"/src/org/Coconut2D/anim/CocoTouchEvent.jspp",
	"/src/org/Coconut2D/anim/CocoVector.jspp",
	"/src/org/Coconut2D/anim/CocoMatrix.jspp",
	"/src/org/Coconut2D/anim/CocoKeyFrame.jspp",
	"/src/org/Coconut2D/anim/CocoTimeline.jspp",
	"/src/org/Coconut2D/anim/CocoClip.jspp",
	"/src/org/Coconut2D/game/CocoSprite.jspp",
	"/src/org/Coconut2D/game/CocoSpriteActor.jspp",
	"/src/org/Coconut2D/game/CocoSpriteBonus.jspp",
	"/src/org/Coconut2D/game/CocoSpriteBullet.jspp",
	"/src/org/Coconut2D/game/CocoSpriteEnemy.jspp",
	"/src/org/Coconut2D/game/CocoSpritePlayer.jspp",
	"/src/org/Coconut2D/game/CocoSpriteVisual.jspp",
	"/src/org/Coconut2D/game/CocoTiledLayer.jspp",
	"/src/org/Coconut2D/ui/UIView.jspp",
	"/src/org/Coconut2D/ui/UIControlView.jspp",
	"/src/org/Coconut2D/ui/UIButtonView.jspp",
	"/src/org/Coconut2D/ui/UICheckboxView.jspp",
	"/src/org/Coconut2D/ui/UILabelView.jspp",
	"/src/org/Coconut2D/ui/UINavbarView.jspp",
	"/src/org/Coconut2D/ui/UIPageView.jspp",
	"/src/org/Coconut2D/ui/UIPickerView.jspp",
	"/src/org/Coconut2D/ui/UIScrollView.jspp",
	"/src/org/Coconut2D/ui/UITabView.jspp",
	"/src/org/Coconut2D/ui/UITextView.jspp",
	"/src/org/Coconut2D/util/glu.js",
	"/src/org/Coconut2D/anim/CocoScene.jspp",
	"/src/org/Coconut2D/anim/CocoEngineState.jspp",
	"/src/org/Coconut2D/anim/CocoEngine.jspp",
	"/src/usr/animations/NewAnimation.jspp",
	"/src/usr/animations/SceneGameBoard.jspp",
	"/src/usr/animations/SceneTitle.jspp",
	"/src/usr/states/State_GameBoard.jspp",
	"/src/usr/GameEngine.jspp",
	"/src/usr/states/State_TitleScreen.jspp",
	"/src/main.js"];

	for(var i=0;i<list.length;i++)
	{
		var f = root+list[i];
		var code = read(f);
		f = f.substr(f.lastIndexOf("/")+1);
		buff += "\"script_begin:///" + f + "\";\n" + code + "\n\"script_end:///" + f + "\";\n\n";
	}	
	return buff;	
}

//var code = ____readSourceFiles();
//var gen = compileJSPP("",code, true, true, true, false);
