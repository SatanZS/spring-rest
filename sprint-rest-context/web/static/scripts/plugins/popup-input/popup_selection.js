var PopupSelection=(function($) {
	 		var localPopupOption;
	 		
	 		function initOption(popupOption) {
	 		   localPopupOption=popupOption||{};
	 		
	 		}
	 		
		     function fillBackAndCloseDialog(rowData,fieldId){
		        $( "#dialog-modal").omDialog('close');
		        window.frames[0].location.href="about:blank";//reset the iframe location
		        if(localPopupOption[fieldId].IdFieldId) {
		        	$('#'+localPopupOption[fieldId].IdFieldId).val(rowData[localPopupOption[fieldId].valueColumn]);
		        	if(localPopupOption[fieldId].TxtFieldId) {
		        		$('#'+localPopupOption[fieldId].TxtFieldId).val(rowData[localPopupOption[fieldId].textColumn]);
		        	}
		        }else {
		        	$('#'+fieldId).val(rowData[localPopupOption[fieldId].textColumn]).next('.popup_hidden_Id:eq(0)').val(rowData[localPopupOption[fieldId].valueColumn]);
			        $('#'+fieldId).next().next('.mini-buttonedit-button:eq(0)').hide();
			        $('#'+fieldId).next().next().next('.mini-buttonedit-close:eq(0)').show();
		        }
				if(localPopupOption[fieldId].fields&&$.isPlainObject(localPopupOption[fieldId].fields )) {
					for( key in localPopupOption[fieldId].fields) {
						var colName=localPopupOption[fieldId].fields[key];
						$('#'+key).val(rowData[colName]);
					}
				}
				//callback
				if((localPopupOption[fieldId].callback)&&($.isFunction(localPopupOption[fieldId].callback))) {
					localPopupOption[fieldId].callback.apply(window,rowData,fieldId);
				}
		     };
		     
		     function clearSelection(object,fieldId) {
		    	$(object).hide();
		    	$(object).prev('.mini-buttonedit-button:eq(0)').show();
		    	$('#'+fieldId).val('').next('.popup_hidden_Id:eq(0)').val('');
		     }
		     
		     function openSelection(fieldId,profileId) {
		     	if(localPopupOption[fieldId]) {
			     	var requestUrl=localPopupOption[fieldId].url;
			     	var title=localPopupOption[fieldId].title;
			     	var dialogWidth=localPopupOption[fieldId]['dialogWidth']||localPopupOption['dialogWidth']||535;
			     	var dialogHeight=localPopupOption[fieldId]['dialogHeight']||localPopupOption['dialogHeight']||535;
			         $( "#dialog-modal").omDialog({
			         	title:title,
			         	width:dialogWidth,
			         	height:dialogHeight
			         });
			         $( "#dialog-modal").omDialog('open');
			         var frameLoc=window.frames[0].location;
			         var width=localPopupOption[fieldId]['tableWidth']||localPopupOption['tableWidth']||500;
			         var height=localPopupOption[fieldId]['tableHeight']||localPopupOption['tableHeight']||300;
			         var limit=localPopupOption[fieldId]['limit']||localPopupOption['limit']||300;
			         frameLoc.href=requestUrl+"?fieldId="+fieldId+"&profileId="+profileId+"&width="+width+"&height="+height+"&limit="+limit; 
		         }else {
		         	alert("no such field id.");
		         }
		     }
		     
		    $(function() {
		        $( "#dialog-modal").omDialog({
		            autoOpen: false,
		            width:localPopupOption['dialogWidth']||535,
		            height: localPopupOption['dialogHeight']||535,
		            modal: true
		        });
		        for(var htmlId in localPopupOption) {
				        $('#'+htmlId).keydown(function(e){
				             if(e.keyCode==118){ //F7
				            	 //var fieldId=$(this).attr('id');
								  //openSelection(fieldId);
				                return false;
				           }else{
				               return false; //forbide any input
				           }
				        });
		        }
		        
		        $( ".mini-buttonedit-button" ).each(function() {
					var value= $(this).prev().prev('.mini-buttonedit-input').val();
					if(value&&value!='') {
						$(this).hide();
						$(this).next().show();
					}
					 
				});
		    });

		   	function addClass(obj,cssClazz) {
		   		$(obj).addClass(cssClazz);
		   	}
		   	function removeClass(obj,cssClazz) {
		   	 $(obj).removeClass(cssClazz);
		   	}
		   	
	 	   return {
	 	   
		 	   "initOption":initOption,
		 	   
		 	   "fillBackAndCloseDialog":fillBackAndCloseDialog,
		 	   
		 	   "clearSelection":clearSelection,
		 	   
		 	   "openSelection":openSelection,
		 	   
		 	   "addClass":addClass,
		 	   
		 	   "removeClass":removeClass
	 	   
	 	   }
	 	
	 	}($))
	 	