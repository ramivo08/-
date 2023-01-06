/****************************************************************************************
*** ID                  : common-dyRow.js
*** Description         : 동적 입력 row를 컨트롤하는 공통 내용
***                       -> 반드시 jq-common.js 파일이 먼저 import 되어야 함. (달력과 message창 때문)
*** -----------------------------    Modified Log   --------------------------------------
*** ver             date                        author                  description
***  -----------------------------------------------------------------------------------------
*** 1.0         2017-01-16                      NJS                 	First Coding.
*****************************************************************************************/


/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 다이나믹 처리 util 함수.
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
DYUtils = {
    /**
     * 다이나믹 util을 사용할 수 있는 통합 function
     * ==================
     * 사용가능 arguments
     * ------------------
     * unitType               [ all   (required)   ] : unit 구분값, 필수, 'table'/'group'
     * procType               [ all   (required)   ] : 처리 구분, 필수, 'add'/'remove'
     * dyAreaId               [ all   (required)   ] : 다이나믹 처리 최상위의 영역의 id, 필수
     *                                                 unitType이 'table'은 해당 table의 id, 'group'는 dynamic unit을 감싸고 있는 영역의 id
     * srcIdx                 [ table (add)        ] : 'table'의 add 에서만 사용하고 신규추가를 위한 대상 row의 index.
     * isInit                 [ all   (add)        ] : 'table/group'의 add에서 사용, 신규추가된 unit의 각 객체를 초기화 할 것인지 확인. (default=true)
     * chkNm                  [ all   (remove)     ] : 'table/group'의 remove에서 사용, 삭제를 위한 check box의 name값. (default=delChk)
     * checkAllNm             [ table (remove)     ] : 'table'의 remove에서만 사용, 삭제 checkbox의 전체선택 checkbox name (default=chkAll)
     * noCheckMsg             [ all   (remove)     ] : 'table/group'의 remove에서만 사용, 체크하지 않고 삭제버튼을 클릭했을 때 메시지.
     * afterAdd               [ all   (add)        ] : 'table/group'의 add에서만 사용, 새로 추가후 발생되는 event function
     * beforeRemove           [ all   (remove)     ] : 'table/group'의 remove에서만 사용, 삭제되기전에 발생되는 event function
     * changeFile             [ all   (add/remove) ] : 모든 상황에서 적용, 파일객체가 존재할 때 파일객체에 change 이벤트 함수 연결
     * buildFileObjHtmlString [ all   (add/remove) ] : 모든 상황에서 적용, 파일객체 신규로 재 정의하는 html 문자열. (아직정의 안됨)
     * dyGrpClassNm           [ group (add/remove) ] : 'group'에서만 사용, dynamic unit의 class명 (default=_dynamicGroup)
     *                                                 dynamic unit는 반드시 html태그에 class명을 명시 한다.
     * calendarClassNm        [ all   (add)        ] : 'table/group'의 add에서만 사용, 달력 객체의 class 명 ( default=_calendar)
     * radioNm        			[ all   (add)        ] : 'table/group'의 add에서만 사용, 라디오 박스의 name 명
     * ==================
     * @param args
     * @returns
     */
    actionDyUnit : function (args) {

        var unitType = args.unitType;
        var procType = args.procType;

        // table의 row단위 컨트롤
        if(DYCom.unitType.table == unitType) {

            if(DYCom.procType.add == procType) {
                return DYUtils.addRow(args) ;
            }
            else if(DYCom.procType.remove == procType) {
                return DYUtils.removeCheckRow(args);
            }
        }
        // Group 단위의 컨트롤
        else if(DYCom.unitType.group == unitType) {
            if(DYCom.procType.add == procType) {
                return DYUtils.addDyGrpInArea(args);
            }
            else if(DYCom.procType.remove == procType) {
                return DYUtils.removeCheckDyGrp(args);
            }
        }
    },

    //+++++++++++++++++++++++++++++++++++++++++++++++++
    // Table의 Row 단위를 추가 및 삭제.
    //+++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * tbody의 제일 마지막 row의 clone를 만들어서 제일 마지막에 붙인다.
     * @param tbId
     * @param funcNm
     * @param calendarClassNm 달력 class 명
     * @returns
     */
    addRow : function(args) {

        var rtn                    = null;
        var dyAreaId               = args.dyAreaId;
        var afterAdd               = args.afterAdd;
        var calendarClassNm        = args.calendarClassNm;
        var buildFileObjHtmlString = args.buildFileObjHtmlString;
        var changeFile             = args.changeFile;
        var isInit                 = args.isInit;

        try {
             // 테이블을 찾아서 로우 추가
            var tbody = $('#' + dyAreaId + ' tbody');
            var rows = tbody.find('tr').length;
            var args = {
                dyAreaId               : dyAreaId ,
                srcIdx                 : rows-1,
                tarIdx                 : rows  ,
                isInit                 : isInit,
                calendarClassNm        : calendarClassNm,
                afterAdd               : afterAdd,
                buildFileObjHtmlString : buildFileObjHtmlString,
                changeFile             : changeFile
            };
            rtn = DYUtils.addAppendByRowIndex(args);

        }catch (e) {
            alert("DYUtils.addRow func - "+e.Message);
        }
        return rtn;
    },

    /**
     * 특정 index(srcIdx)의 row의 clone를 만들어서 특정 index(tarIdx)위치에 붙인다.
     * @param tbId
     * @param srcIdx
     * @param tarIdx
     * @param isInit 초기화 여부
     * @param calendarClassNm 달력 class 명
     * @param funcNm
     * @returns
     */
    addAppendByRowIndex : function(args) {
        var newRow   = null;

        var dyAreaId               = args.dyAreaId ;
        var srcIdx                 = args.srcIdx;
        var tarIdx                 = args.tarIdx;   // 사용안함.

        try {
            // 테이블을 찾아서 로우 추가
           var tbody = $('#' + dyAreaId + ' tbody');
           var preRow = tbody.find('tr:eq('+(srcIdx)+')');
           // 복제하여 추가.
           args.fullAreaObj = tbody;
           args.preObj      = preRow;
           newRow           = DYCom.appendCloneUnit(args);

           return newRow;

        }catch (e) {
            alert("DYUtils.addAppendByRowIndex func - "+e.Message);
        }
    },
    /**
     * 해당 table에서 삭제시 삭제여부 checkbox를 삭제한 row를 삭제한다.
     * @param dyAreaId table의 id
     * @param chkNm 삭제여부 checkbox name;
     * @param funcNm
     * @returns
     */
    removeCheckRow : function (args){

        var rtnObj = null;

        var dyAreaId               = args.dyAreaId ;
        var noCheckMsg             = args.noCheckMsg;
        var chkNm                  = (args.chkNm)?      args.chkNm : DYCom.dfCheckNm;      // df : delChk
        var checkAllNm             = (args.checkAllNm)? checkAllNm : DYCom.dfCheckAllNm;   // df : chkAll

        try {
            // 테이블을 찾아서 로우 추가
            var tbody = $('#' + dyAreaId + ' tbody');

            // check된 내용이 없을 때 message표시하고 그대로 종료.
            if(noCheckMsg != undefined && noCheckMsg != ""){
                if(tbody.find("input:checkbox[name="+chkNm+"]:checked").size() == 0){
                    msgAlert(noCheckMsg);
                    return;
                }
            }

            tbody.find('tr').each(function(){

                if($(this).find("input:checkbox[name="+chkNm+"]").prop("checked") == true ){

                    var rows = tbody.find('tr').length;

                    // 하나의 row를 삭제하는 행위 처리.
                    args.remObj  = $(this);
                    args.unitCnt = rows;
                    rtnObj = DYCom.removeUnit(args);

                }
            });

            // check all 용도의 checkbox의 선택해지
            $("input[name="+checkAllNm+"]").prop("checked", false);

            //  삭제되었으면 null, 삭제되지 않고 초기화만 되었다면 해당 areaObject가 리턴.
            return rtnObj;

        }catch (e) {
               alert("DYUtils.removeCheckRow func - "+e.Message);
        }
    },

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // 특정 Area 단위를 추가 및 삭제.
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * 해당 area의 내부의 맨 마지막에 특정 group를 생성 추가.
     * @param dyAreaId
     * @param funcNm
     * @returns {___anonymous_newGroupObj}
     */
    addDyGrpInArea : function (args) {

        var newGroupObj = null;

        var dyAreaId               = args.dyAreaId;
        var dyAreaObj              = args.dyAreaObj;
        var afterAdd               = args.afterAdd;
        var buildFileObjHtmlString = args.buildFileObjHtmlString;
        var changeFile             = args.changeFile;
        var calendarClassNm        = (args.calendarClassNm)?   args.calendarClassNm : DYCom.dfCalendarClassNm;
        var dyGrpClassNm           = (args.dyGrpClassNm)?      args.dyGrpClassNm    : DYCom.dfDyGrpClassNm;        // df : _dynamicGroup

        var dynamicGrpClassNmStr = "."+dyGrpClassNm;   // df : ._dynamicGroup

        try {
            var divObj = null;
            if(dyAreaId)
                divObj          = $("#"+dyAreaId);
            else if(dyAreaObj)
                divObj          = dyAreaObj;

            var dynamicGroupObj = divObj.find( dynamicGrpClassNmStr+":last-child");

            // 복제하여 추가.
            args.fullAreaObj = divObj;
            args.preObj      = dynamicGroupObj;
            newGroupObj      = DYCom.appendCloneUnit(args);

            return newGroupObj;

        }catch (e) {
               alert("DYUtils.addDyGrpInArea func - "+e.Message);
        }
    },
    /**
     * 삭제 checkbox가 check된 대상만 삭제하는 func
     * @param dyAreaId
     * @param chkNm
     * @param funcNm
     * @returns
     */
    removeCheckDyGrp : function (args){

    	var rtnObj = null;

        var dyAreaId               = args.dyAreaId;
        var dyAreaObj              = args.dyAreaObj;
        var noCheckMsg             = args.noCheckMsg;
        var chkNm                  = (args.chkNm)?        args.chkNm        : DYCom.dfCheckNm;        // df : delChk
        var dyGrpClassNm           = (args.dyGrpClassNm)? args.dyGrpClassNm : DYCom.dfDyGrpClassNm;    // df : _dynamicGroup
        
        var dynamicGrpClassNmStr = "."+dyGrpClassNm;   // df : ._dynamicGroup

        try {
            var divObj = null;
            if(dyAreaId)
                divObj          = $("#"+dyAreaId);
            else if(dyAreaObj)
                divObj          = dyAreaObj;
            var dynamicGroupObj = divObj.find( dynamicGrpClassNmStr );
            
            // check된 내용이 없을 때 message표시하고 그대로 종료.
            if(noCheckMsg != undefined && noCheckMsg != ""){
                if(divObj.find("input:checkbox[name="+chkNm+"]:checked").size() == 0){
                    msgAlert(noCheckMsg);
                    return;
                }
            }

            dynamicGroupObj.each(function(){
                if($(this).find("input:checkbox[name="+chkNm+"]").prop("checked") == true ){
                    var objCnt = divObj.find(dynamicGrpClassNmStr).length;
                    // 하나의 group를 삭제하는 행위 처리.
                    args.remObj  = $(this);
                    args.unitCnt = objCnt;
                    rtnObj = DYCom.removeUnit(args);

                }
            });

            // 삭제되었다면  null이, 삭제되지 않고 초기화만 되었다면 해당 areaObject가 리턴.
            return rtnObj;
        }catch (e) {
            alert("DYUtils.removeCheckDyGrp func - "+e.Message);
        }
    },
    /**
     * 다이나믹 form 입력항목 검사.
     * @param args
     * @returns {Boolean}
     */
    dyFormValidation : function (args){

        var isValid = true;
        var checkUnitObjList = false;
        var checkUnitFunc    = false;

        if(args != undefined && args != null) {
            checkUnitObjList = (args.checkUnitObjList)? args.checkUnitObjList : false;
            checkUnitFunc    = (args.checkUnitFunc)?    args.checkUnitFunc    : false;
        }

        if(checkUnitObjList && checkUnitObjList.size() > 0) {

            //다이나믹 form 항목 검사.
            checkUnitObjList.each(function(){

                // 오류이면 break 처리.
                if(!isValid) return false;

                // 검사 대상 unit
                var unitObj = $(this);

                // 해당 row가 하나라도 입력됐다면 검사해야함.
                if(DYCom.isCheckObjects(unitObj)) {

                    // 검사해야할 대상만 검사.
                    DYCom.getCheckObjects(unitObj).each(function(){

                        // 정의된 검사 func 수행.
                        var checkFunc = DYCom.getFuncObj(checkUnitFunc);
                        if(checkFunc != null){
                            if(!checkFunc($(this))) { isValid = false; return false; }
                        }

                    });
                }

            });
        }


        return isValid;
    }

};

/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *  Dynamic 처리의 공통내용
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
DYCom = {
    dfCalendarClassNm   : "_calendar",
    dfDyGrpClassNm      : "_dynamicGroup",
    dfCheckAllNm        : "chkAll",
    dfCheckNm           : "delChk",
    unitType            : { table  : "table",
                            group  : "group" },
    procType            : { add    : "add"  ,
                            remove : "remove"},

    /**
     * 대상 객체(preObj)를 복제하여 preObj바로 뒤에 추가하는 행위 수행.
     *
     * @param fullAreaObj
     * @param preObj
     * @param newObj
     * @param afterAddRow
     * @param calendarClassNmStr
     */
    appendCloneUnit : function(args) {

        var fullAreaObj            = args.fullAreaObj
        var preObj                 = args.preObj;
        var isInit                 = args.isInit;
        var afterAdd               = args.afterAdd;
        var buildFileObjHtmlString = args.buildFileObjHtmlString;
        var changeFile             = args.changeFile;
        var calendarClassNm        = (args.calendarClassNm)? args.calendarClassNm:DYCom.dfCalendarClassNm;
        var radioNm               = args.radioNm;

        var calendarClassNmStr = "."+calendarClassNm;

        if(isInit == undefined || isInit == null || isInit == "") {
            isInit = true;
        }

        // 달력 객체를 제거한다.(clone 과정에서 문제 발생)
        DYCom.destoryDatePicker(preObj.find(calendarClassNmStr));

        // 라디오 버튼의 name값을 삭제한다.(clone 과정에서 문제 발생)
        preObj.find("input[name='"+radioNm+"']").attr("name", "");

        // 복제하여 tbody 맨 마지막에 붙이기
        var newObj = preObj.clone(true).appendTo(fullAreaObj);

        // 달력 객체를 모두 생성한다.
        DYCom.createDatePicker(preObj.find(calendarClassNmStr));
        DYCom.createDatePicker(newObj.find(calendarClassNmStr));

        // 이전 객체의 라디오 버튼의 name값을 재 생성한다.
        preObj.find("input[type='radio']").attr("name", radioNm);

        // 신규 추가 영역 초기화.
        if(isInit == true) {
            DYCom.setControlInit({
                targetObj              : newObj,
                buildFileObjHtmlString : buildFileObjHtmlString,
                changeFile             : changeFile
                });
        }

        // row를 추가하고 수행되는 event 정의
        var afterAddFuncObj = DYCom.getFuncObj(afterAdd);
        if(afterAddFuncObj != null){
            // preRow : 새로 생성되기전 마지막 객체
            // newRow : 새로 생성된 객체
            afterAddFuncObj(preObj, newObj);
        }

        return newObj;
    },

    /**
     * 하나의 다이나믹unit를 제거하는 행위 처리.
     * @param remObj
     * @param beforeRemove
     * @param unitCnt
     * @param buildFileObjHtmlString
     * @param changeFile
     * @returns
     */
    removeUnit : function(args) {
        var remObj                 = false;
        var unitCnt                = false;
        var beforeRemove           = false;
        var buildFileObjHtmlString = false;
        var changeFile             = false;
        var isRemoveLastUnit       = false;     // 마지막 unit가 남았을 때 삭제할 지 여부

        if(args!=undefined && args != null) {
            remObj                 = (args.remObj                )? args.remObj                :false;
            unitCnt                = (args.unitCnt               )? args.unitCnt               :false;
            beforeRemove           = (args.beforeRemove          )? args.beforeRemove          :false;
            buildFileObjHtmlString = (args.buildFileObjHtmlString)? args.buildFileObjHtmlString:false;
            changeFile             = (args.changeFile            )? args.changeFile            :false;
            isRemoveLastUnit       = (args.isRemoveLastUnit      )? args.isRemoveLastUnit      :false;
        }
        
        var rtnObj = null;
        if(remObj){

            rtnObj = args.remObj;

            // row가 삭제되기 전에 이벤트 수행부분(삭제되는 수만큼 수행됨)
            if(beforeRemove){
                var beforeRemoveRowFuncObj = DYCom.getFuncObj(beforeRemove);
                
                if(beforeRemoveRowFuncObj != null){
                    // 삭제될 row의 객체를 arg로 넘겨줌.
//                	console.log("remObj*********  "+remObj);
                    beforeRemoveRowFuncObj(remObj);
                }
            }

            // 삭제 수행시 현재 row가 1개 일 때 row는 지우지 않고 data를 초기화 함.
            if(unitCnt > 1 || isRemoveLastUnit) {
                remObj.remove();
                rtnObj = null;
            }else{
                DYCom.setControlInit({
                    targetObj              : remObj,
                    buildFileObjHtmlString : buildFileObjHtmlString,
                    changeFile             : changeFile
                });
                rtnObj = remObj;
            }
        }

        return rtnObj;
    },

    /**
     * 특정 row에 포함되어 있는 object의 값을 초기화 한다.
     * @param jRowobj
     * @param rowCnt
     */
    setControlInit : function (args){

        var jDyUnitobj             = args.targetObj;
        var buildFileObjHtmlString = args.buildFileObjHtmlString;
        var changeFile             = args.changeFile;

        try {
            jDyUnitobj.find(':input:text').val('');
            jDyUnitobj.find(':input:hidden').val('');
            jDyUnitobj.find('select').each(function () {
                $(this).val("");
            });

            jDyUnitobj.find(':input:radio'   ).prop("checked", false);
            jDyUnitobj.find(':input:checkbox').prop("checked", false);

            //-----------------
            //파일 객체가 존재한다면 다음 수행
            //-----------------
            var fileObjects = jDyUnitobj.find("input:file");
            if(fileObjects.size() > 0){

                // 해당 AREA의 모든 파일 객체를 찾는다.
                fileObjects.each(function(){

                    var curFileObj = $(this);

                    // 파일 객체 rebuild 수행. (build용 html 문자열을 전달했을 때)
                    if(buildFileObjHtmlString != undefined
                            && buildFileObjHtmlString != null
                            && buildFileObjHtmlString != "") {

                    }
                    // TODO : 테스트 필요.
                    // build용 문자열을 전달받지 못했을 때 기존 객체를 clone처리하여 수행.
                    else{
                        // 파일 객체 재 생성.
                        curFileObj = DYCom.reCreateFileObj(curFileObj);
                    }

                    // 파일 change 이벤트 연결
                    if(changeFile != undefined
                            && changeFile != null
                            && changeFile != "") {

                        curFileObj.unbind("change");
                        curFileObj.bind({
                            change:function(){
                                var changeFileFn = DYCom.getFuncObj(changeFile);
                                if(changeFileFn != null)
                                    changeFileFn(curFileObj) ;    //수행
                            }
                        });
                    }

                });

            }
            // 파일 관련 부분 끝.
            //------------------

        }catch (e) {
            alert("DYCom.setControlInit func - "+e.Message);
        }
    },
    /**
     * 해당 파일 객체를 삭제하고 동일한 파일 객체를 다시 생성
     *   - 첨부했을 때 파일 허용된 파일이 아니거나 등의 이유로 객체를 초기활하고 싶을 때 사용
     *     -> 초기화가 되지 않기때문에 삭재하고 다시 생성함.
     * @param fileObj
     */
    reCreateFileObj : function(fileObj) {
        var obj = null;
        if(fileObj){
            obj = fileObj;
            var newObj = obj.clone(true);
            obj.after(newObj);
            obj.remove();
            obj = newObj;
        }
        return obj;
    },
    /**
     * 함수명으로 함수 객체 return
     * @param funcNm
     * @returns
     */
    getFuncObj : function (funcNm) {
        var funcObj = null;
        if(funcNm != undefined && funcNm != null && funcNm.length > 0) {

            if( typeof funcNm == "string"){
                funcObj = eval(funcNm);
            }
            else if( typeof funcNm == "function"){
                funcObj = funcNm;
            }

            return funcObj;
        }
    },
    /**
     * 해당 dynamic unit내에서 valid 검사를 해야할 대상만 가져오기
     * @param unitObj
     * @returns
     */
    getCheckObjects : function(unitObj) {
        return unitObj.find(":input:not(input:hidden):not(input:checkbox):not(:disabled)");
    },
    /**
     * 해당 dynamic unit 입력항목을 확인하여 valid검사를 해야 할지 아닐지 여부
     * @param unitObj
     * @returns {Boolean}
     */
    isCheckObjects  : function(unitObj) {

        var inObjCnt = 0;
        var isCheck = true;
        DYCom.getCheckObjects(unitObj).each(function(){
            if( $.trim($(this).val()) != ""){
                inObjCnt ++;
                return false; // break
            }
        });

        if( inObjCnt == 0 ) isCheck = false;

        return isCheck;
    },
    /**
     * id값의 뒤 3자리를 이용해서 자동 증가 시킨다.
     * @param idStr
     * @returns {String}
     */
    idIncrease : function (idStr){
        var rtnVal = idStr;
        if(idStr != undefined && idStr != null && idStr.length > 3) {
            var headStr = idStr.substring(0,idStr.length-3);
            var idxStr  = idStr.substring(idStr.length-3, idStr.length);
            var nextIdx = parseInt(idxStr, 10) + 1;

            var nextIdxStr = nextIdx + "";
            if(nextIdxStr.length == 1) {
                rtnVal = headStr + '00' + nextIdxStr;
            }else if(nextIdxStr.length == 2) {
                rtnVal = headStr + '0' + nextIdxStr;
            }else if(nextIdxStr.length == 3) {
                rtnVal = headStr + nextIdxStr;

            }
        }
        return rtnVal;
    },
    /**
     * 달력 객체 달기.
     * @param obj
     */
    createDatePicker : function (obj) {
        if(obj.size() > 0){
            obj.datepicker({
                dateFormat:'yy-mm-dd'
            });
        }
    },
    /**
     * 해당 달력 object를 저거한다.
     * @param obj
     * @param initVal text 객체의 초기화 값. null일 경우 초기화 하지 않고 값 유지.
     */
    destoryDatePicker : function (obj, initVal){

        if(obj.size() > 0){

            obj.datepicker( "destroy" );
            if(initVal != null){
                obj.val(initVal);
            }

            // id속성을 제거 해서 create할때 자동으로 id가 발번되게해야 문제 발생 안함.
            // dynamic form에서 달력 객체는 id로 접근하면 안됨.
            obj.removeAttr("id");
        }
    }

};




