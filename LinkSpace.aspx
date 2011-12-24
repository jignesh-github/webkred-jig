<%@ Page Title="" Language="C#" MasterPageFile="~/MasterLinkSpace.master" AutoEventWireup="true"
    CodeFile="LinkSpace.aspx.cs" Inherits="WebKred.LinkSpace" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <link rel="stylesheet" type="text/css" href="grid/gt_grid.css" />
    <link rel="stylesheet" type="text/css" href="grid/skin/vista/skinstyle.css" />

    <script type="text/javascript" src="grid/gt_msg_en.js"></script>

    <script type="text/javascript" src="grid/gt_grid_all.js"></script>

    <script type="text/javascript" src="grid/flashchart/fusioncharts/FusionCharts.js"></script>

    <script type="text/javascript" src="grid/calendar/calendar.js"></script>

    <script type="text/javascript" src="grid/calendar/calendar-setup.js"></script>

    <script type="text/javascript">

        var grid_demo_id = "myGrid1";

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

            recordType: 'array'
        }

        var colsOption =
        [
           { id: 'LinkSpaceId', header: "", width: 100 },
           { id: 'ForumURL', header: "Forum URL", width: 150 },
	       { id: 'ForumContent', header: "Forum Content", width: 150 },
	       { id: 'ActorId', header: "Actor", width: 70 },
	       { id: 'ActorName', header: "Actor Name", width: 70, width: 80, editor: { type: "select", options: { 'US': 'US', 'FR': 'FR', 'BR': 'BR' }, defaultText: 'US'} },
	       { id: 'UserName', header: "User Name", width: 80 },
	       { id: 'Password', header: "Password", width: 80 },
	       { id: 'ReplyContent', header: "Reply Content", width: 150 },
	       { id: 'ReplyURL', header: "Reply URL", width: 150 },
	       { id: 'ProjectId', header: "Project Id", width: 10 }
        ];

        var gridOption =
        {
            id: grid_demo_id,
            loadURL: 'LinkSpaceController.aspx?p=load',
            saveURL: 'LinkSpaceController.aspx?p=save',
            width: "1000",
            height: "200",
            container: 'gridbox',
            replaceContainer: true,
            encoding: 'UTF-8',
            dataset: dsOption,
            columns: colsOption,
            pageSizeList: [5, 10, 15, 20],
            clickStartEdit: true,
            toolbarContent: 'reload | add del | save | print | nav goto | pagesize | csv xls xml pdf chart | filter '
        };

        var mygrid = new Sigma.Grid(gridOption);
        Sigma.Util.onLoad(function() { mygrid.render() });
        
    </script>

    <div>
        <table width="20%" style="margin: 15px;">
            <tr>
                <td>
                    <a href="#">SOW</a>
                </td>
                <td>
                    <a href="#">Campaign Name</a>
                </td>
            </tr>
        </table>
        <div id="bigbox" style="margin: 15px;">
            <div id="gridbox" style="border: 0px solid #cccccc; background-color: #f3f3f3; padding: 5px;
                height: 200px; width: 700px;">
            </div>
        </div>
    </div>
</asp:Content>
