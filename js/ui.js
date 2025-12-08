/**
 * @author Filipe Caixeta / http://filipecaixeta.com.br/
 */
/** 

CWS.UI = function (controller) 
	{
		this.controller = controller;
		var topMenu = $("#topMenu");
		$("#topMenu>nav > ul > li").each(function(i){$(this)
			.mouseenter(function(){topMenu.css('height','90px');})
			.mouseleave(function(){topMenu.css('height','45px');})
		});
		topMenu.click(
			function  (ev) 
			{
				var title = ev.target.title
				switch (title)
				{
					case "New Project":
						var d = new CWS.DialogBox(title);
						d.newProject(controller);
						break;
					case "Open Project":
						var d = new CWS.DialogBox(title);
						d.openProject(controller);
						break;
					case "Open Machine":
						var d = new CWS.DialogBox(title);
						d.openMachine(controller);
						break;
					case "Workpiece dimensions":
						var d = new CWS.DialogBox(title);
						d.workpieceDimensions(controller);
						break;
                    case "Export File":
                        controller.exportToOBJ();
                        break;
                    case "Tool":
                        var d = new CWS.DialogBox(title);
						d.tool(controller);
                        break;
					default:
						break;
				}
			});

		this.elementEditor = $(document.getElementById("editor"));
		this.elementTopMenu = $(document.getElementById("topMenu"));
		this.elementCanvasContainer = $(document.getElementById("canvasContainer"));
		this.elementBottomMenu = $(document.getElementById("bottomMenu"));
		this.elementBody = $(document.body);
		this.resize();
		$("#saveIcon").css('color', 'green').click(function (ev) 
		{
			controller.save(true);
		});
		$("#autoRunIcon").css('color', 'green').click(function () 
		{
			controller.autoRun=!controller.autoRun;
			if (controller.autoRun===false)
				$(this).css('color','red');
			else
			{
				$(this).css('color','green');
				controller.runInterpreter(true);
			}
		});
		$("#runIcon").click(function (ev) 
		{
			controller.runInterpreter(true);
		});
		$("#run2DIcon").css('color', 'green').click(function (ev) 
		{
			controller.run2D=!controller.run2D;
			if (controller.run2D===false)
				$(this).css('color','red');
			else
			{
				$(this).css('color','green');
			}
			controller.update2D();
		});
		/*$("#run3DIcon").css('color', 'green').click(function (ev) 
		{
			controller.run3D=!controller.run3D;
			if (controller.run3D===false)
				$(this).css('color','red');
			else
			{
				$(this).css('color','green');
			}
			controller.update3D();
		});*/
		/*var color = "green";
		if (controller.renderer.displayWireframe===false)
			color="red";
		$("#wireframeIcon").css('color', color).click(function (ev) 
		{
			controller.runWireframe=!controller.runWireframe;
			if (controller.runWireframe===false)
			{
				$(this).css('color','red');
			}
			else
			{
				$(this).css('color','green');
			}
		});*/
/** 
		$("#runAnimationIcon").click(function (ev) 
		{
			controller.runAnimation();
		});
	}
*/
/** 
CWS.UI.prototype.constructor = CWS.UI;

CWS.UI.prototype.resize = function()
	{
		var width = this.elementBody.innerWidth();
		var height = this.elementBody.innerHeight();
		
		var editorWidth;
		if (this.elementEditor.css('display')==='none')
			editorWidth = 0;
		else
			editorWidth = this.elementEditor.innerWidth();

		this.elementTopMenu.innerWidth(width-editorWidth);
		this.elementCanvasContainer.innerWidth(width-editorWidth);
		this.controller.renderer.setSize(width-editorWidth,height);
		this.elementBottomMenu.innerWidth(width-editorWidth);
	};

CWS.UI.prototype.createStats = function (v) 
	{
		if (v===false)
			return {update:function(){}};
		var maincanvasdiv = document.getElementById("canvasContainer");
		var width = maincanvasdiv.offsetWidth;
		var height = maincanvasdiv.offsetHeight;

		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.right = '0px';
		maincanvasdiv.appendChild( stats.domElement );
		return stats;
	};

CWS.DialogBox = function (title)
	{
		$("#dialogBox").remove();
		
		this.dialog = $( '<div id="dialogBox" title="'+title+'" ></div>');
	}

CWS.DialogBox.prototype.constructor = CWS.DialogBox;

CWS.DialogBox.prototype.newProject = function (controller)
	{
		var html = '<form id="menuNewProject">'+
			'<ul>'+
			'  <li>'+
			'    <label for= "projectName" >Project Name</label>'+
			'    <input type= "text" name= "projectName" />'+
			'  </li>'+
			'  <li>'+
			'    <label for= "machineType" >Machine</label>'+
			'    <input type="radio" name="machineType" value="Lathe" checked> Lathe'+
			'    <input type="radio" name="machineType" value="Mill"> Mill'+
			'    <input type="radio" name="machineType" value="3D Printer"> 3D Printer'+
			'  </li>'+
			'</ul>'+
			'</form>';
		this.dialog.append($(html));
		this.dialog.dialog(
	      {
	      width: 400,
	      buttons: 
	        { 
	            "Create": function()
	            {
	            	var values = {};
	            	var result = $(this.firstChild).serializeArray();
	            	for (var i = 0; i < result.length; i++) 
	            	{
	            		values[result[i].name]=result[i].value;
	            	}
	              	controller.createProject(values);
	              	$(this).dialog("close");
	            },
	          	"Cancel": function()
	            {
          			$(this).dialog("close");
	            }
	        }
	      });
	};

CWS.DialogBox.prototype.openProject = function (controller)
	{
		html = '<ul class="tableList">';
		var fileList = Object.keys(controller.listProjects());
		for (var i = 0; i < fileList.length; i++) 
		{
			html += '<li><span class="icon icon-file-text2"></span>'+fileList[i]+'</li>';
		}
		html += "</ul>";
        var dialog = this.dialog;
		html = $(html).click(function (event) 
			{
                if (event.target.parentElement.tagName.toLocaleLowerCase()=="div")
                    return;
                var projectName="";
                if (event.target.tagName.toLocaleLowerCase()=="li")
                {
                    projectName = event.target.textContent;
                }
                else
                {
                    projectName = event.target.parentElement.textContent;
                }
                controller.openProject(projectName);
                dialog.dialog("close");
			});
		this.dialog.append(html);
		this.dialog.dialog(
	      {
	      width: 400,
	      buttons: 
	        { 
	          	"Cancel": function()
	            {
          			$(this).dialog("close");
	            }
	        }
	      });
	};

CWS.DialogBox.prototype.openMachine = function (controller)
	{
		html = '<ul class="tableList">'+
		'  <li><span class="icon icon-lathe"></span>Lathe</li>'+
		'  <li><span class="icon icon-mill"></span>Mill</li>'+
		'  <li><span class="icon icon-printer"></span>3D Printer</li>'+
		'</ul>';
        var dialog = this.dialog;
		html = $(html).click(function (event) 
			{
                if (event.target.parentElement.tagName.toLocaleLowerCase()=="div")
                    return;
                var machineName="";
                if (event.target.tagName.toLocaleLowerCase()=="li")
                {
                    machineName = event.target.textContent;
                }
                else
                {
                    machineName = event.target.parentElement.textContent;
                }
                controller.openMachine(machineName);
                dialog.dialog("close");
			});
		this.dialog.append(html);
		this.dialog.dialog(
	      {
	      width: 400,
	      buttons: 
	        { 
	          	"Cancel": function()
	            {
          			$(this).dialog("close");
	            }
	        }
	      });
	};

CWS.DialogBox.prototype.workpieceDimensions = function (controller)
	{
        var machineType = controller.getMachineType();
        var workpiece = controller.getWorkpiece();
        var html = "";
        if (machineType=="Lathe")
        {
            html = '<form id="workpieceDimensions">'+
            '<ul>'+
            '  <li>'+
            '    <label for= "x" >Diameter</label>'+
            '    <input type= "text" name= "x" value="'+workpiece.x+'"/>'+
            '  </li>'+
            '   <li>'+
            '    <label for= "z" >Lenght</label>'+
            '    <input type= "text" name= "z" value="'+workpiece.z+'"/>'+
            '  </li>'+
            '</ul></form>';
        }
        else if (machineType=="Mill")
        {
            html = '<form id="workpieceDimensions">'+
            '<ul>'+
            '  <li>'+
            '    <label for= "x" >Size X</label>'+
            '    <input type= "text" name= "x" value="'+workpiece.x+'"/>'+
            '  </li>'+
            '  <li>'+
            '    <label for= "y" >Size Y</label>'+
            '    <input type= "text" name= "y" value="'+workpiece.y+'"/>'+
            '  </li>'+
            '   <li>'+
            '    <label for= "z" >Size Z</label>'+
            '    <input type= "text" name= "z" value="'+workpiece.z+'"/>'+
            '  </li>'+
            '</ul></form>';
        }
        else if (machineType=="3D Printer")
        {
            html = '<form id="workpieceDimensions">'+
            '<ul>'+
            '  <li>'+
            '    <label for= "filamentDiameter" >Filament Diameter</label>'+
            '    <input type= "text" name="filamentDiameter" value="'+workpiece.filamentDiameter+'"/>'+
            '  </li>'+
            '  <li>'+
            '    <label for= "layerHeight" >Layer Height</label>'+
            '    <input type= "text" name= "layerHeight" value="'+workpiece.layerHeight+'"/>'+
            '  </li>'+
            '</ul></form>';
        }
		this.dialog.append($(html));
		this.dialog.dialog(
	      {
	      width: 400,
	      buttons: 
	        { 
	            "Save": function()
	            {
	            	var values = {};
	            	var result = $(this.firstChild).serializeArray();
	            	for (var i = 0; i < result.length; i++) 
	            	{
	            		values[result[i].name]=parseFloat(result[i].value);
	            	}
	              	controller.setWorkpieceDimensions(values);
	              	$(this).dialog("close");
	            },
	          	"Cancel": function()
	            {
          			$(this).dialog("close");
	            }
	        }
	      });
	};

CWS.DialogBox.prototype.tool = function (controller)
	{
		var machineType = controller.getMachineType();
		if (machineType==="Lathe")
		{
			var machine = controller.getMachine();
			var html = 	'<form id="menuTool">'+
						'<ul>'+
						'  <li>'+
						'    <label for= "toolradius" >Tool radius</label>'+
						'    <input type= "text" name= "toolradius" value="'+machine.tool.radius+'"/>'+
						'  </li>'+
						'</ul>'+
						'</form>';
			this.dialog.append($(html));
			this.dialog.dialog(
		      {
		      width: 400,
		      buttons: 
		        {
		            "Save": function()
		            {
		            	var values = {};
		            	var result = $(this.firstChild).serializeArray();
		            	for (var i = 0; i < result.length; i++) 
		            	{
		            		values[result[i].name]=parseFloat(result[i].value);
		            	}
		              	controller.setMachineTool(values);
		              	$(this).dialog("close");
		            },
		          	"Cancel": function()
		            {
	          			$(this).dialog("close");
		            }
		        }
		      });
		}
		else if (machineType==="Mill")
		{
			var machine = controller.getMachine();
			var html = 	'<form id="menuTool">'+
						'<ul>'+
						'  <li>'+
						'    <label for= "toolradius" >Tool radius</label>'+
						'    <input type= "text" name= "toolradius" value="'+machine.tool.radius+'"/>'+
						'  </li>'+
						'  <li>'+
						'    <label for= "toolangle" >Tool angle</label>'+
						'    <input type= "text" name= "toolangle" value="'+machine.tool.angle+'"/>'+
						'  </li>'+
						'</ul>'+
						'</form>';
			this.dialog.append($(html));
			this.dialog.dialog(
		      {
		      width: 400,
		      buttons: 
		        {
		            "Save": function()
		            {
		            	var values = {};
		            	var result = $(this.firstChild).serializeArray();
		            	for (var i = 0; i < result.length; i++) 
		            	{
		            		values[result[i].name]=parseFloat(result[i].value);
		            	}
		              	controller.setMachineTool(values);
		              	$(this).dialog("close");
		            },
		          	"Cancel": function()
		            {
	          			$(this).dialog("close");
		            }
		        }
		      });
		}
		else
		{
			var html = 	'<ul><li>'+machineType+' does not support tool settings</li></ul>';
			this.dialog.append($(html));
			this.dialog.dialog(
		      {
		      width: 400,
		      buttons: 
		        {
		            "Ok": function()
		            {
		              	$(this).dialog("close");
		            },
		          	"Cancel": function()
		            {
	          			$(this).dialog("close");
		            }
		        }
		      });
		}
	};
*/
/**
 * @author Filipe Caixeta / http://filipecaixeta.com.br/
 */

CWS.UI = function (controller) 
	{
		this.controller = controller;
		var topMenu = $("#topMenu");
		$("#topMenu>nav > ul > li").each(function(i){$(this)
			.mouseenter(function(){topMenu.css('height','90px');})
			.mouseleave(function(){topMenu.css('height','45px');})
		});
		topMenu.click(
			function  (ev) 
			{
				// Ajuste: garante que pegamos o "title" do elemento clicado OU do ancestral com title
				var title = $(ev.target).closest('[title]').attr('title') || '';
				switch (title)
				{
					case "New Project":
						var d = new CWS.DialogBox(title);
						d.newProject(controller);
						break;
					case "Open Project":
						var d = new CWS.DialogBox(title);
						d.openProject(controller);
						break;
					case "Exercise 1":
						var d = new CWS.DialogBox(title);
						d.openMachine(controller);
						break;
					case "Workpiece dimensions":
						var d = new CWS.DialogBox(title);
						d.workpieceDimensions(controller);
						break;
                    case "Export File":
                        controller.exportToOBJ();
                        break;
                    case "Exercise 3":
                        var d = new CWS.DialogBox(title);
						d.tool(controller);
                        break;
					default:
						break;
					case "Exercise 2":
					var d = new CWS.DialogBox(title);
					d.machineSettings(controller);
					break;
				}
			});

		this.elementEditor = $(document.getElementById("editor"));
		this.elementTopMenu = $(document.getElementById("topMenu"));
		this.elementCanvasContainer = $(document.getElementById("canvasContainer"));
		this.elementBottomMenu = $(document.getElementById("bottomMenu"));
		this.elementBody = $(document.body);
		this.resize();
		$("#saveIcon").css('color', 'green').click(function (ev) 
		{
			controller.save(true);
		});
		$("#autoRunIcon").css('color', 'green').click(function () 
		{
			controller.autoRun=!controller.autoRun;
			if (controller.autoRun===false)
				$(this).css('color','red');
			else
			{
				$(this).css('color','green');
				controller.runInterpreter(true);
			}
		});
		$("#runIcon").click(function (ev) 
		{
			controller.runInterpreter(true);
		});
		$("#run2DIcon").css('color', 'green').click(function (ev) 
		{
			controller.run2D=!controller.run2D;
			if (controller.run2D===false)
				$(this).css('color','red');
			else
			{
				$(this).css('color','green');
			}
			controller.update2D();
		});
		/*$("#run3DIcon").css('color', 'green').click(function (ev) 
		{
			controller.run3D=!controller.run3D;
			if (controller.run3D===false)
				$(this).css('color','red');
			else
			{
				$(this).css('color','green');
			}
			controller.update3D();
		});*/
		
		var color = "green";
		if (controller.renderer.displayWireframe===false)
			color="red";
		$("#wireframeIcon").css('color', color).click(function (ev) 
		{
			controller.runWireframe=!controller.runWireframe;
			if (controller.runWireframe===false)
			{
				$(this).css('color','red');
			}
			else
			{
				$(this).css('color','green');
			}
		});
		$("#runAnimationIcon").click(function (ev) 
		{
			controller.runAnimation();
		});
	}

CWS.UI.prototype.constructor = CWS.UI;

CWS.UI.prototype.resize = function()
	{
		var width = this.elementBody.innerWidth();
		var height = this.elementBody.innerHeight();
		
		var editorWidth;
		if (this.elementEditor.css('display')==='none')
			editorWidth = 0;
		else
			editorWidth = this.elementEditor.innerWidth();

		this.elementTopMenu.innerWidth(width-editorWidth);
		this.elementCanvasContainer.innerWidth(width-editorWidth);
		this.controller.renderer.setSize(width-editorWidth,height);
		this.elementBottomMenu.innerWidth(width-editorWidth);
	};

CWS.UI.prototype.createStats = function (v) 
	{
		if (v===false)
			return {update:function(){}};
		var maincanvasdiv = document.getElementById("canvasContainer");
		var width = maincanvasdiv.offsetWidth;
		var height = maincanvasdiv.offsetHeight;

		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.right = '0px';
		maincanvasdiv.appendChild( stats.domElement );
		return stats;
	};

CWS.DialogBox = function (title)
	{
		$("#dialogBox").remove();
		this.dialog = $( '<div id="dialogBox" title="'+title+'" ></div>');
		// Garante que o elemento está no DOM (ajuda a evitar qualquer atraso do jQuery UI)
		$("body").append(this.dialog);
	};

CWS.DialogBox.prototype.constructor = CWS.DialogBox;

CWS.DialogBox.prototype.newProject = function (controller)
	{
		var html = '<form id="menuNewProject">'+
			'<ul>'+
			'  <li>'+
			'    <label for= "projectName" >Project Name</label>'+
			'    <input type= "text" name= "projectName" />'+
			'  </li>'+
			'  <li>'+
			'    <label for= "machineType" >Machine</label>'+
			'    <input type="radio" name="machineType" value="Lathe" checked> Lathe'+
			'    <input type="radio" name="machineType" value="Mill"> Mill'+
			'    <input type="radio" name="machineType" value="3D Printer"> 3D Printer'+
			'  </li>'+
			'</ul>'+
			'</form>';
		this.dialog.append($(html));
		this.dialog.dialog(
	      {
	      width: 400,
	      buttons: 
	        { 
	            "Create": function()
	            {
	            	var values = {};
	            	var result = $(this.firstChild).serializeArray();
	            	for (var i = 0; i < result.length; i++) 
	            	{
	            		values[result[i].name]=result[i].value;
	            	}
	              	controller.createProject(values);
	              	$(this).dialog("close");
	            },
	          	"Cancel": function()
	            {
          			$(this).dialog("close");
	            }
	        }
	      });
	};

CWS.DialogBox.prototype.openProject = function (controller)
	{
		html = '<ul class="tableList">';
		var fileList = Object.keys(controller.listProjects());
		for (var i = 0; i < fileList.length; i++) 
		{
			html += '<li><span class="icon icon-file-text2"></span>'+fileList[i]+'</li>';
		}
		html += "</ul>";
        var dialog = this.dialog;
		html = $(html).click(function (event) 
			{
                if (event.target.parentElement.tagName.toLocaleLowerCase()=="div")
                    return;
                var projectName="";
                if (event.target.tagName.toLocaleLowerCase()=="li")
                {
                    projectName = event.target.textContent;
                }
                else
                {
                    projectName = event.target.parentElement.textContent;
                }
                controller.openProject(projectName);
                dialog.dialog("close");
			});
		this.dialog.append(html);
		this.dialog.dialog(
	      {
	      width: 400,
	      buttons: 
	        { 
	          	"Cancel": function()
	            {
          			$(this).dialog("close");
	            }
	        }
	      });
	};

/**CWS.DialogBox.prototype.openMachine = function (controller)
	{
		html = '<ul class="tableList">'+
		'  <li><span class="icon icon-lathe"></span>Lathe</li>'+
		'  <li><span class="icon icon-mill"></span>Mill</li>'+
		'  <li><span class="icon icon-printer"></span>3D Printer</li>'+
		'</ul>';
        var dialog = this.dialog;
		html = $(html).click(function (event) 
			{
                if (event.target.parentElement.tagName.toLocaleLowerCase()=="div")
                    return;
                var machineName="";
                if (event.target.tagName.toLocaleLowerCase()=="li")
                {
                    machineName = event.target.textContent;
                }
                else
                {
                    machineName = event.target.parentElement.textContent;
                }
                controller.openMachine(machineName);
                dialog.dialog("close");
			});
		this.dialog.append(html);
		this.dialog.dialog(
	      {
	      width: 400,
	      buttons: 
	        { 
	          	"Cancel": function()
	            {
          			$(this).dialog("close");
	            }
	        }
	      });
	}; **/

/* =========================
   Exercício 1 (OpenMachine)
   ========================= */
CWS.DialogBox.prototype.openMachine = function(controller) {
    // HTML inicial: imagem do enunciado
    var html = `
        <div style="text-align:center;">
            <img id="exercise1" src="images/exercise1.png.jpg" alt="Exercise 1" style="width:100%; max-width:355px; height:auto; margin-bottom:10px;">
        </div>
    `;

    var dialog = this.dialog;
    dialog.empty().append(html);

    // Pré-carrega as imagens para evitar atraso na primeira troca
    (function preload(){
        var a = new Image(); a.src = "images/answer1.png.jpg";
        var b = new Image(); b.src = "images/exercise1.png.jpg";
    })();

    // Ao clicar em "Code": mostra a RESPOSTA e muda o botão para "Return"
    function showResultado() {
        $("#exercise1").attr("src", "images/answer1.png.jpg");
        dialog.dialog("option", "buttons", {
            "Return": showVoltar,
            "Close": function() { $(this).dialog("close"); }
        });
    }

    // Ao clicar em "Return": volta ao enunciado e muda o botão para "Code"
    function showVoltar() {
        $("#exercise1").attr("src", "images/exercise1.png.jpg");
        dialog.dialog("option", "buttons", {
            "Code": showResultado,
            "Close": function() { $(this).dialog("close"); }
        });
    }

    // Abre o diálogo com título e botões iniciais
    dialog.dialog({
        title: "Exercise 1",
        width: 400,
        buttons: {
            "Code": showResultado,
            "Close": function() { $(this).dialog("close"); }
        }
    });
};

/* =========================
   Dimensões da peça
   ========================= */
CWS.DialogBox.prototype.workpieceDimensions = function (controller)
	{
        var machineType = controller.getMachineType();
        var workpiece = controller.getWorkpiece();
        var html = "";
        if (machineType=="Lathe")
        {
            html = '<form id="workpieceDimensions">'+
            '<ul>'+
            '  <li>'+
            '    <label for= "x" >Diameter</label>'+
            '    <input type= "text" name= "x" value="'+workpiece.x+'"/>'+
            '  </li>'+
            '   <li>'+
            '    <label for= "z" >Lenght</label>'+
            '    <input type= "text" name= "z" value="'+workpiece.z+'"/>'+
            '  </li>'+
            '</ul></form>';
        }
        else if (machineType=="Mill")
        {
            html = '<form id="workpieceDimensions">'+
            '<ul>'+
            '  <li>'+
            '    <label for= "x" >Size X</label>'+
            '    <input type= "text" name= "x" value="'+workpiece.x+'"/>'+
            '  </li>'+
            '  <li>'+
            '    <label for= "y" >Size Y</label>'+
            '    <input type= "text" name= "y" value="'+workpiece.y+'"/>'+
            '  </li>'+
            '   <li>'+
            '    <label for= "z" >Size Z</label>'+
            '    <input type= "text" name= "z" value="'+workpiece.z+'"/>'+
            '  </li>'+
            '</ul></form>';
        }
        else if (machineType=="3D Printer")
        {
            html = '<form id="workpieceDimensions">'+
            '<ul>'+
            '  <li>'+
            '    <label for= "filamentDiameter" >Filament Diameter</label>'+
            '    <input type= "text" name="filamentDiameter" value="'+workpiece.filamentDiameter+'"/>'+
            '  </li>'+
            '  <li>'+
            '    <label for= "layerHeight" >Layer Height</label>'+
            '    <input type= "text" name= "layerHeight" value="'+workpiece.layerHeight+'"/>'+
            '  </li>'+
            '</ul></form>';
        }
		this.dialog.append($(html));
		this.dialog.dialog(
	      {
	      width: 400,
	      buttons: 
	        { 
	            "Save": function()
	            {
	            	var values = {};
	            	var result = $(this.firstChild).serializeArray();
	            	for (var i = 0; i < result.length; i++) 
	            	{
	            		values[result[i].name]=parseFloat(result[i].value);
	            	}
	              	controller.setWorkpieceDimensions(values);
	              	$(this).dialog("close");
	            },
	          	"Cancel": function()
	            {
          			$(this).dialog("close");
	            }
	        }
	      });
	};

/***CWS.DialogBox.prototype.tool = function (controller)
	{
		var machineType = controller.getMachineType();
		if (machineType==="Lathe")
		{
			var machine = controller.getMachine();
			var html = 	'<form id="menuTool">'+
						'<ul>'+
						'  <li>'+
						'    <label for= "toolradius" >Tool radius</label>'+
						'    <input type= "text" name= "toolradius" value="'+machine.tool.radius+'"/>'+
						'  </li>'+
						'</ul>'+
						'</form>';
			this.dialog.append($(html));
			this.dialog.dialog(
		      {
		      width: 400,
		      buttons: 
		        {
		            "Save": function()
		            {
		            	var values = {};
		            	var result = $(this.firstChild).serializeArray();
		            	for (var i = 0; i < result.length; i++) 
		            	{
		            		values[result[i].name]=parseFloat(result[i].value);
		            	}
		              	controller.setMachineTool(values);
		              	$(this).dialog("close");
		            },
		          	"Cancel": function()
		            {
	          			$(this).dialog("close");
		            }
		        }
		      });
		}
		else if (machineType==="Mill")
		{
			var machine = controller.getMachine();
			var html = 	'<form id="menuTool">'+
						'<ul>'+
						'  <li>'+
						'    <label for= "toolradius" >Tool radius</label>'+
						'    <input type= "text" name= "toolradius" value="'+machine.tool.radius+'"/>'+
						'  </li>'+
						'  <li>'+
						'    <label for= "toolangle" >Tool angle</label>'+
						'    <input type= "text" name= "toolangle" value="'+machine.tool.angle+'"/>'+
						'  </li>'+
						'</ul>'+
						'</form>';
			this.dialog.append($(html));
			this.dialog.dialog(
		      {
		      width: 400,
		      buttons: 
		        {
		            "Save": function()
		            {
		            	var values = {};
		            	var result = $(this.firstChild).serializeArray();
		            	for (var i = 0; i < result.length; i++) 
		            	{
		            		values[result[i].name]=parseFloat(result[i].value);
		            	}
		              	controller.setMachineTool(values);
		              	$(this).dialog("close");
		            },
		          	"Cancel": function()
		            {
	          			$(this).dialog("close");
		            }
		        }
		      });
		}
		else
		{
			var html = 	'<ul><li>'+machineType+' does not support tool settings</li></ul>';
			this.dialog.append($(html));
			this.dialog.dialog(
		      {
		      width: 400,
		      buttons: 
		        {
		            "Ok": function()
		            {
		              	$(this).dialog("close");
		            },
		          	"Cancel": function()
		            {
	          			$(this).dialog("close");
		            }
		        }
		      });
		}
	}; ***/

/* =========================
   Exercício 3 (Tool)
   ========================= */
CWS.DialogBox.prototype.tool = function(controller) {
    var html = `
        <div style="text-align:center;">
            <img id="exercise3" src="images/exercise3.png.jpg" alt="Tool" style="width:100%; max-width:355px; height:auto; margin-bottom:10px;">
        </div>
    `;

    var dialog = this.dialog;
    dialog.empty().append(html);

    // Pré-carrega as imagens para evitar atraso
    (function preload(){
        var a = new Image(); a.src = "images/answer3.png.jpg";
        var b = new Image(); b.src = "images/exercise3.png.jpg";
    })();

    function showResultado() {
        $("#exercise3").attr("src", "images/answer3.png.jpg");
        dialog.dialog("option", "buttons", {
            "Return": showVoltar,
            "Close": function() { $(this).dialog("close"); }
        });
    }

    function showVoltar() {
        $("#exercise3").attr("src", "images/exercise3.png.jpg");
        dialog.dialog("option", "buttons", {
            "Code": showResultado,
            "Close": function() { $(this).dialog("close"); }
        });
    }

    dialog.dialog({
        title: "Exercise 3",
        width: 400,
        buttons: {
            "Code": showResultado,
            "Close": function() { $(this).dialog("close"); }
        }
    });
};

/* =========================
   Exercício 2 (Machine Settings)
   ========================= */
CWS.DialogBox.prototype.machineSettings = function(controller) {
    var html = `
        <div style="text-align:center;">
            <img id="exercise2" src="images/exercise2.png.jpg" alt="Machine Settings" style="width:100%; max-width:350px; height:auto; margin-bottom:10px;">
        </div>
    `;

    var dialog = this.dialog;
    dialog.empty().append(html);

    // Pré-carrega para evitar atraso
    (function preload(){
        var a = new Image(); a.src = "images/answer2.png.jpg";
        var b = new Image(); b.src = "images/exercise2.png.jpg";
    })();

    function showResultado() {
        $("#exercise2").attr("src", "images/answer2.png.jpg");
        dialog.dialog("option", "buttons", {
            "Return": showVoltar,
            "Close": function() { $(this).dialog("close"); }
        });
    }

    function showVoltar() {
        $("#exercise2").attr("src", "images/exercise2.png.jpg");
        dialog.dialog("option", "buttons", {
            "Code": showResultado,
            "Close": function() { $(this).dialog("close"); }
        });
    }

    dialog.dialog({
        title: "Exercise 2",
        width: 400,
        buttons: {
            "Code": showResultado,
            "Close": function() { $(this).dialog("close"); }
        }
    });
};
