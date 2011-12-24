<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LinkSpaceCRUD.aspx.cs" Inherits="WebKred.LinkSpaceCRUD" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>CRUD Application</title>
    <link rel="Stylesheet" type="text/css" href="CSS/StyleSheet.css" />
    <link rel="stylesheet" type="text/css" href="grid/gt_grid.css" />
    <link rel="stylesheet" type="text/css" href="grid/skin/vista/skinstyle.css" />

    <script type="text/javascript" src="grid/gt_msg_en.js"></script>

    <script type="text/javascript" src="grid/gt_grid_all.js"></script>

    <script type="text/javascript" src="grid/flashchart/fusioncharts/FusionCharts.js"></script>

    <script type="text/javascript" src="grid/calendar/calendar.js"></script>

    <script type="text/javascript" src="grid/calendar/calendar-setup.js"></script>

    <script language="javascript" type="text/javascript">

        function EnableSOW() {
            document.getElementById('<%= txtSOWDescription.ClientID%>').disabled = false;
            document.getElementById('<%= divSowSave.ClientID%>').style.display = 'inline-block';
            document.getElementById('btnSOWEdit').style.display = 'none';
        }

        function CheckFileUpload() {
            var fileUpload = document.getElementById('<%= fupSOWDoc.ClientID%>');

            if (fileUpload.value == "" || fileUpload.value.lenght < 4) {
                alert("Please Select File For Upload");
                return false;
            }
            else {
                return true;
            }
        }

        function Reset() {
            document.getElementById('<%= txtSOWDescription.ClientID%>').disabled = true;
            document.getElementById('<%= divSowSave.ClientID%>').style.display = 'none';
            document.getElementById('btnSOWEdit').style.display = 'inline-block';
            document.getElementById('<%= divSOW.ClientID%>').style.display = 'none';
        }
        function SaveAndReset() {
            document.getElementById('<%= txtSOWDescription.ClientID%>').disabled = true;
            document.getElementById('<%= divSowSave.ClientID%>').style.display = 'none';
            document.getElementById('btnSOWEdit').style.display = 'inline-block';
        }

        function DeleteSowDetail(id, filePath) {
            PageMethods.DeleteSowDetail(id, filePath, OnSucceeded, OnFailed);

            document.getElementById("mDiv_" + id).style.display = 'none';
            var olddiv = document.getElementById("mDiv_" + id);
            document.removeChild(olddiv);
        }

        function OnSucceeded(result, userContext, methodName) {
            if (result != null) {
                if (result != "0") {
                    alert(result);
                }
            }
            else {
                //do something
            }
        }

        function OnFailed(error, userContext, methodName) {
            if (error != null) {
                alert("An error occurred: " + error.get_message());
            }
        }
        
    </script>

    <script type="text/javascript" language="javascript">

        function checkURL(value) {
            //var re = new RegExp(/http:\/\/www.\w+([-+.]\w+)*.com/);
            var re = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");

            if (re.test(value)) {
                return true;
            }
            else {
                return "Invalid URL";
            }
        }
           
    </script>

    <script type="text/javascript" language="javascript">

        // ** Bottom Grid Actor ** //

        function GetActor(id) {
            PageMethods.GetActor(id, OnSucceeded, OnFailed);
        }

        function OnSucceeded(result, userContext, methodName) {
            if (result != null) {
                var hasInnerText1 = (document.getElementsByTagName("body")[0].innerText != undefined) ? false : true;

                if (!hasInnerText1) {
                    // for IE and Chrome
                    tblActor.rows[0].cells[1].innerHTML = result[0];
                    tblActor.rows[1].cells[1].innerHTML = result[1];
                    tblActor.rows[2].cells[1].innerHTML = result[2];
                    tblActor.rows[3].cells[1].innerHTML = result[3];
                    tblActor.rows[4].cells[1].innerHTML = result[4];
                    tblActor.rows[5].cells[1].innerHTML = result[5];
                }
                else {
                    // for Firefox
                    tblActor = document.getElementById("tblActor");
                    divBottomGridActor = document.getElementById("divBottomGridActor");
                    divBottomGridLinkSpace = document.getElementById("divBottomGridLinkSpace");

                    tblActor.rows[0].cells[1].innerHTML = result[0];
                    tblActor.rows[1].cells[1].innerHTML = result[1];
                    tblActor.rows[2].cells[1].innerHTML = result[2];
                    tblActor.rows[3].cells[1].innerHTML = result[3];
                    tblActor.rows[4].cells[1].innerHTML = result[4];
                    tblActor.rows[5].cells[1].innerHTML = result[5];
                }

                if (result[6] != '') {
                    document.getElementById('a_download').href = "ActorDocuments/" + result[8] + "_" + result[6];
                    document.getElementById('div_lnkview').style.display = 'inline';
                }
                else {
                    document.getElementById('a_download').href = "";
                    document.getElementById('div_lnkview').style.display = 'none';
                }

                divBottomGridLinkSpace.style.display = 'none';
                divBottomGridActor.style.display = 'inline-block';
            }
            else {
                //do something
            }
        }

        function OnFailed(error, userContext, methodName) {
            if (error != null) {
                alert("An error occurred: " + error.get_message());
            }
        }

        // ** Bottom Grid Linkspace ** //
        function BottomGrid(str, colNum) {

            var hasInnerText = (document.getElementsByTagName("body")[0].innerText != undefined) ? false : true;

            if (colNum != 5) {
                // for IE and Chrome
                if (!hasInnerText) {
                    var lastIndex = str.cells[5].innerText.lastIndexOf(",");
                    actorName = str.cells[5].innerText.substr(0, lastIndex);

                    tblLinkSpace.rows[0].cells[1].innerHTML = "<a href='" + str.cells[2].innerText + "' target='_blank'>" + str.cells[2].innerText + "<a>";
                    tblLinkSpace.rows[1].cells[1].innerHTML = str.cells[3].innerText;
                    tblLinkSpace.rows[2].cells[1].innerHTML = actorName
                    tblLinkSpace.rows[3].cells[1].innerHTML = str.cells[6].innerText;
                    tblLinkSpace.rows[4].cells[1].innerHTML = str.cells[7].innerText;
                    tblLinkSpace.rows[5].cells[1].innerHTML = str.cells[8].innerText;
                    tblLinkSpace.rows[6].cells[1].innerHTML = "<a href='" + str.cells[9].innerText + "' target='_blank'>" + str.cells[9].innerText + "<a>";
                }
                // for Firefox
                else {
                    tblLinkSpace = document.getElementById("tblLinkSpace");
                    divBottomGridActor = document.getElementById("divBottomGridActor");
                    divBottomGridLinkSpace = document.getElementById("divBottomGridLinkSpace");

                    var lastIndex = str.cells[5].textContent.lastIndexOf(",");
                    actorName = str.cells[5].textContent.substr(0, lastIndex);

                    tblLinkSpace.rows[0].cells[1].innerHTML = "<a href='" + str.cells[1].textContent + "' target='_blank'>" + str.cells[1].textContent + "<a>";
                    tblLinkSpace.rows[1].cells[1].innerHTML = str.cells[2].textContent;
                    tblLinkSpace.rows[2].cells[1].innerHTML = actorName;
                    tblLinkSpace.rows[3].cells[1].innerHTML = str.cells[5].textContent;
                    tblLinkSpace.rows[4].cells[1].innerHTML = str.cells[6].textContent;
                    tblLinkSpace.rows[5].cells[1].innerHTML = str.cells[7].textContent;
                    tblLinkSpace.rows[6].cells[1].innerHTML = "<a href='" + str.cells[8].textContent + "' target='_blank'>" + str.cells[8].textContent + "<a>";
                }

                divBottomGridActor.style.display = 'none';
                divBottomGridLinkSpace.style.display = 'inline-block';
            }
            else {
                var arr;
                // for chrome ie
                if (!hasInnerText) {
                    arr = str.cells[5].innerText.split(',');
                    actorId = arr[arr.length - 1];
                    GetActor(actorId);
                }
                // for firefox
                else {
                    arr = str.cells[5].textContent.split(',');
                    actorId = arr[arr.length - 1];
                    GetActor(actorId);
                }
            }
        }    
            
    </script>

    <script type="text/javascript" language="javascript">

        // ** Main Grid ** //
        var grid_demo_id = "WebKRedGrid";
        var dsOption =
        {
            fields:
            [
		        { name: 'LinkSpaceId' },
		        { name: 'ForumURL' },
		        { name: 'ForumContent' },
                { name: 'ActorId' },
		        { name: 'ActorName' },
		        { name: 'UserName' },
		        { name: 'Password' },
		        { name: 'ReplyContent' },
		        { name: 'ReplyURL' },
                { name: 'ProjectId' }
	        ],
            recordType: 'object'
        }

        var colsOption =
        [
           { id: 'chk', width: 0, isCheckColumn: true, filterable: false, exportable: false },
           { id: 'LinkSpaceId', header: "Id", width: 0, hidden: true, filterable: false },
           { id: 'ForumURL', header: "Forum URL", width: 150, editor: { type: 'text', validator: function(value, record, colObj, grid) { return checkURL(value); } } },
	       { id: 'ForumContent', header: "Forum Content", width: 190, editor: { type: 'textarea', width: '200px', height: '100px', validRule: ['R']} },
           { id: 'ActorId', header: "ActorID", width: 0, hidden: true, filterable: false },
           { id: 'ActorName', header: "Actor", width: 80, editor: { type: "select", options: getActorList(), validRule: ['R']} },
	       { id: 'UserName', header: "User Name", width: 80, editor: { type: 'text', validRule: ['R']} },
	       { id: 'Password', header: "Password", width: 80, editor: { type: 'text', validRule: ['R']} },
	       { id: 'ReplyContent', header: "Reply Content", width: 190, editor: { type: 'textarea', width: '200px', height: '100px', validRule: ['R']} },
	       { id: 'ReplyURL', header: "Replay URL", width: 150, editor: { type: 'text', validator: function(value, record, colObj, grid) { return checkURL(value); } } },
           { id: 'ProjectId', header: "Project Id", width: 0, hidden: true, filterable: false }
        ];

        var gridOption =
        {
            id: grid_demo_id,
            loadURL: 'LinkSpaceCRUDController.aspx?p=load',
            saveURL: 'LinkSpaceCRUDController.aspx?p=save',
            //exportURL: 'CRUDController.aspx?p=export',            
            //width: "995",
            //height: "304",
            width: "98%",
            height: "304",
            container: 'gridbox',
            replaceContainer: true,
            encoding: 'UTF-8',
            dataset: dsOption,
            columns: colsOption,
            clickStartEdit: false,
            defaultRecord: { 'LinkSpaceId': "00", 'ForumURL': "", 'ForumContent': "", 'ActorId': "0", 'ActorName': "", 'UserName': "", 'Password': "", 'ReplyContent': "", 'ReplyURL': "", 'ProjectId': "0" },
            pageSize: 20,
            pageSizeList: [10, 20, 50],
            showIndexColumn: true,
            //showGridMenu: true,
            //allowCustomSkin: true,
            skin: "vista",
            selectRowByCheck: true,
            toolbarContent: "nav | goto | pagesize | reload | add del save | pdf xls csv print | filter | state",
            onClickCell: function(value, record, cell, row, colNO, rowNO, columnObj, grid) { BottomGrid(row, colNO); }
        };

        var mygrid = new Sigma.Grid(gridOption);
        Sigma.Util.onLoad(function() { mygrid.render() }); 
                               
    </script>

</head>
<body>
    <form runat="server" id="frmLS">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
    </asp:ScriptManager>
    <div class="master-main">
        <table width="100%" border="0">
            <tr>
                <td class="master-main" style="width: 70%; text-align: left;">
                    <asp:Literal ID="litClientUserName" runat="server" Text=""></asp:Literal>
                </td>
                <td class="master-main" style="width: 20%; text-align: right;">
                    <asp:Literal ID="litUserName" runat="server" Text=""></asp:Literal>
                </td>
                <td class="master-main">
                    <asp:LinkButton ID="lnkLogout" runat="server" Text="Sign Out" OnClick="lnkLogout_Click"
                        Style="text-decoration: underline;"></asp:LinkButton>
                </td>
            </tr>
        </table>
        <table width="100%" border="0">
            <tr style="text-decoration: underline;">
                <td class="master-main" style="width: 70%; text-align: left;">
                    <a href="Default.aspx" class="master-main">Home</a>
                </td>
                <td class="master-main">
                    <a href="LinkSpaceCRUD.aspx">Link Space</a>
                </td>
                <td class="master-main">
                    <a id="hlAddActor" runat="server" href="AddActor.aspx">Actors</a>
                </td>
                <td class="master-main">
                    <a id="hlAllPeople" runat="server" href="#">All People</a>
                </td>
                <td class="master-main">
                    <a id="hlAccount" runat="server" href="#">Account</a>
                </td>
            </tr>
        </table>
    </div>
    <table width="100%">
        <tr>
            <td>
                <asp:UpdatePanel ID="upSOW" runat="server" UpdateMode="Conditional">
                    <ContentTemplate>
                        <div class="mainSowDiv" id="divSOW" runat="server">
                            <table width="100%" style="background-color: #0082B0; padding-top: 3%; padding-bottom: 3%;">
                                <tr>
                                    <td colspan="2" style="width: 100%; text-decoration: underline; text-align: center;
                                        font-family: Comic Sans MS; font-size: 16px;">
                                        STATEMENT OF WORK
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <asp:Label ID="lblEditErrMsg" runat="server"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="width: 100%;">
                                        <asp:HiddenField ID="hdnSOWId" runat="server" />
                                        <input type="button" id="btnClose" name="btnClose" style="float: right; margin-left: 10px;"
                                            value="Close" class="botton" onclick="Reset();" />
                                        <div id="divSOWEdit" runat="server" style="float: right">
                                            <input type="button" id="btnSOWEdit" name="btnSOWEdit" value="Edit" class="botton"
                                                onclick="EnableSOW();" />
                                        </div>
                                        <div id="divSowSave" style="display: none; float: right;" runat="server">
                                            <asp:Button ID="btnSOWSave" runat="server" Text="Save" CssClass="botton" OnClick="btnSOWSave_Click"
                                                OnClientClick="SaveAndReset();" /></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="width: 100%; text-align: left; font-family: Comic Sans MS;
                                        font-size: medium;">
                                        Description:
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 100%;">
                                        <asp:TextBox ID="txtSOWDescription" runat="server" Enabled="false" TextMode="MultiLine"
                                            Rows="6" Style="width: 90%; margin-left: 5%; margin-right: 5%;"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="width: 100%;">
                                        <asp:UpdatePanel ID="UpdatePanel2" runat="server" UpdateMode="Conditional">
                                            <ContentTemplate>
                                                <table width="100%" style="background-color: #0082B0; padding-top: 3%; padding-bottom: 3%;">
                                                    <tr>
                                                        <td colspan="2" style="width: 100%; text-align: left; font-family: Comic Sans MS;
                                                            font-size: medium;">
                                                            Attached Documents:
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            <div id="divSOWAttachDoc" runat="server">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            <div id="divFupSowDoc" runat="server">
                                                                <asp:FileUpload ID="fupSOWDoc" runat="server" />&nbsp;&nbsp;
                                                                <asp:Button ID="btnUpload" runat="server" Text="Upload" OnClientClick="return CheckFileUpload()"
                                                                    OnClick="btnUpload_Click" />
                                                            </div>
                                                            <asp:HiddenField ID="hdnBtn" runat="server" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </ContentTemplate>
                                            <Triggers>
                                                <asp:PostBackTrigger ControlID="btnUpload" />
                                            </Triggers>
                                        </asp:UpdatePanel>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </ContentTemplate>
                    <Triggers>
                        <asp:AsyncPostBackTrigger ControlID="btnSOWSave" EventName="click" />
                    </Triggers>
                </asp:UpdatePanel>
            </td>
        </tr>
    </table>
    </form>
    <table border="0" width="95%" style="margin-left: 5px;">
        <tr>
            <td>
                <a id="aSow" style="text-decoration: underline;" href="#" onclick="document.getElementById('<%= divSOW.ClientID%>').style.display='inline-block';">
                    SOW</a> &nbsp;&nbsp;|&nbsp;&nbsp;<asp:Literal ID="litProjectName" runat="server"></asp:Literal>
            </td>
            <td style="width: 47%;" align="left">
                <asp:Literal ID="litErrMsg" runat="server"></asp:Literal>
            </td>
        </tr>
    </table>
    <div id="bigbox" style="margin: 5px;">
        <div id="gridbox">
        </div>
    </div>
    <div style="margin-top: 15px; margin-left: 20px; margin-right: 30px;">
        <div id="divBottomGridLinkSpace" style="display: none; width: 100%; border: 1px solid gray;
            background-color: #f5f5f4;">
            <table width="100%" id="tblLinkSpace">
                <tr>
                    <td style="width: 15%; font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Forum URL:
                    </td>
                    <td style="width: 85%; font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top; font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Forum Content:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Actor:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        User Name:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Password:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top; font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Replay Content:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Replay URL:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
            </table>
        </div>
        <div id="divBottomGridActor" style="display: none; width: 100%; border: 1px solid gray;
            background-color: #f5f5f4;">
            <table width="100%" id="tblActor">
                <tr>
                    <td style="width: 20%; font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        First Name:
                    </td>
                    <td style="width: 80%; font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Last Name:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Email Address:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Birthday:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Age:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top; font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Biography:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                    </td>
                </tr>
                <tr>
                    <td style="font-family: Comic Sans MS; font-size: 15px; font-weight: bold;">
                        Attached Documents:
                    </td>
                    <td style="font-family: Comic Sans MS; font-size: 13px;">
                        <div id="div_lnkview" style="display: none;">
                            <a id="a_download" target="_blank">View</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
