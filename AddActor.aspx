<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AddActor.aspx.cs" Inherits="WebKred.AddActor"
    MasterPageFile="~/MasterLinkSpace.master" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<asp:Content ID="ContentHead" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <title>Actor</title>

    <script type="text/javascript" language="javascript">
        var chkIsActive;
        function CheckUnCheck(actorId, chkIsActiveId) {
            chkIsActive = document.getElementById(chkIsActiveId);
            PageMethods.CheckUnCheck(actorId, chkIsActive.checked, OnSucceeded1, OnFailed1);
        }
        function OnSucceeded1(result, userContext, methodName) {
            if (result != null) {
                if (result != "0") {
                    chkIsActive.checked = 'true';
                    alert(result);
                }
            }
            else {
                //do something
            }

        }

        function OnFailed1(error, userContext, methodName) {
            if (error != null) {
                alert("An error occurred: " + error.get_message());
            }
        }



        function GetEditActor(id) {
            PageMethods.GetEditActor(id, OnSucceeded, OnFailed);
        }

        function OnSucceeded(result, userContext, methodName) {
            if (result != null) {
                document.getElementById('<%= txtFirstNameEditInfo.ClientID %>').value = result[0];
                document.getElementById('<%= txtLastNameEditInfo.ClientID %>').value = result[1];
                document.getElementById('<%= txtEmailEditInfo.ClientID %>').value = result[2];
                document.getElementById('<%= txtBirthDayEditInfo.ClientID %>').value = result[3];
                document.getElementById('<%= txtAgeEditInfo.ClientID %>').value = result[4];
                document.getElementById('<%= txtBIOEditInfo.ClientID %>').value = result[5];
                document.getElementById('<%= txtWaverEditInfo.ClientID %>').value = result[6];
                document.getElementById('<%= hdnWaverFile.ClientID %>').value = result[6];
                document.getElementById('<%= txtOtherEditInfo.ClientID %>').value = result[7];
                document.getElementById('<%= hdnEditActorId.ClientID %>').value = result[8];
                document.getElementById('div_attach').style.display = 'none';

                document.getElementById('<%= fupWaverFileEditInfo.ClientID %>').value = '';

                document.getElementById('<%= txtFirstNameEditInfo.ClientID %>').disabled = true;
                document.getElementById('<%= txtLastNameEditInfo.ClientID %>').disabled = true;
                document.getElementById('<%= txtBirthDayEditInfo.ClientID %>').disabled = true;
                document.getElementById('<%= txtEmailEditInfo.ClientID %>').disabled = true;
                document.getElementById('<%= txtBIOEditInfo.ClientID %>').disabled = true;
                document.getElementById('<%= txtOtherEditInfo.ClientID %>').disabled = true;
                //                document.getElementById('<%= fupWaverFileEditInfo.ClientID %>').disabled = true;

                document.getElementById('div_save').style.display = 'none';
                document.getElementById('btnEditInfo').style.visibility = 'visible';

                if (document.getElementById('<%= txtWaverEditInfo.ClientID %>').value != '') {
                    document.getElementById('a_download').href = "ActorDocuments/" + result[8] + "_" + result[6];
                    document.getElementById('div_lnkview').style.display = 'inline';
                }
                else {
                    document.getElementById('a_download').href = "";
                    document.getElementById('div_lnkview').style.display = 'none';
                }

                document.getElementById('div_uploadWaver').style.display = 'none';
                document.getElementById('<%= divActorPopup.ClientID %>').style.display = 'inline-block';
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

        function EnableEditActor() {
            document.getElementById('div_save').style.display = 'inline';
            document.getElementById('div_attach').style.display = 'inline';
            document.getElementById('<%= txtFirstNameEditInfo.ClientID %>').disabled = false;
            document.getElementById('<%= txtLastNameEditInfo.ClientID %>').disabled = false;
            document.getElementById('<%= txtBirthDayEditInfo.ClientID %>').disabled = false;
            document.getElementById('<%= txtEmailEditInfo.ClientID %>').disabled = false;
            document.getElementById('<%= txtBIOEditInfo.ClientID %>').disabled = false;
            document.getElementById('<%= txtOtherEditInfo.ClientID %>').disabled = false;
            //document.getElementById('<%= fupWaverFileEditInfo.ClientID %>').disabled = false;
            document.getElementById('btnEditInfo').style.visibility = 'hidden';

            document.getElementById('<%= divActorPopup.ClientID %>').style.display = 'none';
            document.getElementById('<%= divActorPopup.ClientID %>').style.display = 'inline-block';

        }

        function CheckValideData() {
            if (document.getElementById("<%= txtFirstName.ClientID %>").value == 'First Name') {
                alert("Please Enter First Name");
                document.getElementById("<%= txtFirstName.ClientID %>").focus();
                return false;
            }
            else if (document.getElementById("<%= txtLastName.ClientID %>").value == 'Last Name') {
                alert("Please Enter Last Name");
                document.getElementById("<%= txtLastName.ClientID %>").focus();
                return false;
            }
            else if (document.getElementById("<%= txtEmailID.ClientID %>").value == 'EMAIL') {
                alert("Please Enter Email ID");
                document.getElementById("<%= txtEmailID.ClientID %>").focus();
                return false;
            }
            else if (document.getElementById("<%= txtDOB.ClientID %>").value == 'mm/dd/yyyy') {
                alert("Please Enter Date Of Birth");
                document.getElementById("<%= txtDOB.ClientID %>").focus();
                return false;
            }
            else if (document.getElementById("<%= txtBIO.ClientID %>").value == 'BIO') {
                alert("Please Enter BIO");
                document.getElementById("<%= txtBIO.ClientID %>").focus();
                return false;
            }
            else {
                if (CheckValidEmailID()) {
                    if (ValideDate(document.getElementById("<%= txtDOB.ClientID %>").value)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }

        function CheckValidEmailID() {

            var str = document.getElementById("<%= txtEmailID.ClientID %>").value;

            var at = "@";
            var dot = ".";
            var lat = str.indexOf(at);
            var lstr = str.length;
            var ldot = str.indexOf(dot);
            if (str.indexOf(at) == -1) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailID.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailID.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailID.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(at, (lat + 1)) != -1) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailID.ClientID %>").focus();
                return false;
            }

            if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailID.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(dot, (lat + 2)) == -1) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailID.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(" ") != -1) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailID.ClientID %>").focus();
                return false;
            }
            return true;

        }


        function CheckValideDataEdit() {
            if (document.getElementById("<%= txtFirstNameEditInfo.ClientID %>").value == '') {
                alert("Please Enter First Name");
                document.getElementById("<%= txtFirstNameEditInfo.ClientID %>").focus();
                return false;
            }
            else if (document.getElementById("<%= txtLastNameEditInfo.ClientID %>").value == '') {
                alert("Please Enter Last Name");
                document.getElementById("<%= txtLastNameEditInfo.ClientID %>").focus();
                return false;
            }
            else if (document.getElementById("<%= txtEmailEditInfo.ClientID %>").value == '') {
                alert("Please Enter Email ID");
                document.getElementById("<%= txtEmailEditInfo.ClientID %>").focus();
                return false;
            }
            else if (document.getElementById("<%= txtBirthDayEditInfo.ClientID %>").value == '') {
                alert("Please Enter Date Of Birth");
                document.getElementById("<%= txtBirthDayEditInfo.ClientID %>").focus();
                return false;
            }
            else if (document.getElementById("<%= txtBIOEditInfo.ClientID %>").value == '') {
                alert("Please Enter BIO");
                document.getElementById("<%= txtBIOEditInfo.ClientID %>").focus();
                return false;
            }
            else {
                if (CheckValidEmailIDEdit()) {
                    if (ValideDate(document.getElementById("<%= txtBirthDayEditInfo.ClientID %>").value)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }

        function CheckValidEmailIDEdit() {

            var str = document.getElementById("<%= txtEmailEditInfo.ClientID %>").value;

            var at = "@";
            var dot = ".";
            var lat = str.indexOf(at);
            var lstr = str.length;
            var ldot = str.indexOf(dot);
            if (str.indexOf(at) == -1) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailEditInfo.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailEditInfo.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailEditInfo.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(at, (lat + 1)) != -1) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailEditInfo.ClientID %>").focus();
                return false;
            }

            if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailEditInfo.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(dot, (lat + 2)) == -1) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailEditInfo.ClientID %>").focus();
                return false;
            }

            if (str.indexOf(" ") != -1) {
                alert("Invalid E-mail ID");
                document.getElementById("<%= txtEmailEditInfo.ClientID %>").focus();
                return false;
            }
            return true;
        }

        var dtCh = "/";
        var date = new Date();
        var minYear = date.getFullYear() - 150;
        var maxYear = date.getFullYear();

        function isInteger(s) {
            var i;
            for (i = 0; i < s.length; i++) {
                // Check that current character is number.
                var c = s.charAt(i);
                if (((c < "0") || (c > "9"))) return false;
            }
            // All characters are numbers.
            return true;
        }

        function stripCharsInBag(s, bag) {
            var i;
            var returnString = "";
            // Search through string's characters one by one.
            // If character is not in bag, append to returnString.
            for (i = 0; i < s.length; i++) {
                var c = s.charAt(i);
                if (bag.indexOf(c) == -1) returnString += c;
            }
            return returnString;
        }

        function daysInFebruary(year) {
            // February has 29 days in any year evenly divisible by four,
            // EXCEPT for centurial years which are not also divisible by 400.
            return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
        }
        function DaysArray(n) {
            for (var i = 1; i <= n; i++) {
                this[i] = 31
                if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
                if (i == 2) { this[i] = 29 }
            }
            return this
        }

        function isDate(dtStr) {
            var daysInMonth = DaysArray(12)
            var pos1 = dtStr.indexOf(dtCh)
            var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
            var strMonth = dtStr.substring(0, pos1)
            var strDay = dtStr.substring(pos1 + 1, pos2)
            var strYear = dtStr.substring(pos2 + 1)
            strYr = strYear
            if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
            if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
            for (var i = 1; i <= 3; i++) {
                if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
            }
            month = parseInt(strMonth)
            day = parseInt(strDay)
            year = parseInt(strYr)
            if (pos1 == -1 || pos2 == -1) {
                alert("The date format should be : mm/dd/yyyy")
                return false
            }
            if (strMonth.length < 1 || month < 1 || month > 12) {
                alert("Please enter a valid month")
                return false
            }
            if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
                alert("Please enter a valid day")
                return false
            }
            if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
                alert("Please enter a valid 4 digit year between " + minYear + " and " + maxYear)
                return false
            }
            if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
                alert("Please enter a valid date")
                return false
            }
            return true
        }

        function ValideDate(dt) {
            if (isDate(dt) == false) {
                return false
            }
            return true
        }

    </script>

</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
    </asp:ScriptManager>
    <div style="float: left; width: 60%; margin-top: 10px; font-weight: bold;">
        CampaignName:
        <asp:Literal ID="litCampaignName" runat="server" Text="Project 1"></asp:Literal>
    </div>
    <div style="float: right; width: 25%; text-align: right; text-decoration: underline;
        margin-top: 10px; font-weight: bold; margin-right: 5%;">
        <asp:LinkButton ID="lnkExportExcel" runat="server" Text="Export to Excel" OnClick="lnkExportExcel_Click"></asp:LinkButton>
    </div>
    <div style="float: left; width: 75%; margin-top: 10px;">
        <asp:Literal ID="litErrorMsg" runat="server"></asp:Literal>
    </div>
    <div style="width: 100%; float: left;">
        <asp:UpdatePanel ID="upActorEditInfo" runat="server" UpdateMode="Conditional">
            <ContentTemplate>
                <div id="divActorPopup" runat="server" style="width: 40%; display: none; position: absolute;
                    padding-left: 30%; padding-right: 30%; padding-bottom: 4%">
                    <table width="100%" style="background-color: #0082B0; padding-top: 3%; padding-bottom: 3%;">
                        <tr>
                            <td colspan="2">
                                <asp:Label ID="lblEditErrMsg" runat="server"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="right">
                                <asp:HiddenField ID="hdnEditActorId" runat="server" />
                                <asp:HiddenField ID="hdnWaverFile" runat="server" />
                                <input type="button" id="btnEditInfo" name="btnEditInfo" value="Edit Info" class="botton"
                                    onclick="return EnableEditActor();" />
                                <div id="div_save" style="display: none">
                                    <asp:Button ID="btnSaveInfo" runat="server" Text="Save Info" CssClass="botton" OnClientClick="return CheckValideDataEdit();"
                                        OnClick="btnSaveInfo_Click" /></div>
                                &nbsp;&nbsp;
                                <input type="button" id="btnCloseInfo" name="btnCloseInfo" value="Close" class="botton"
                                    onclick="javascript:document.getElementById('<%= divActorPopup.ClientID %>').style.display='none';" />
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">
                                <asp:Literal ID="ltrlFirstName" runat="server" Text="FIRST NAME:"></asp:Literal>
                            </td>
                            <td style="width: 70%;">
                                <asp:TextBox ID="txtFirstNameEditInfo" runat="server" Enabled="false" Style="width: 90%;
                                    margin-left: 5%; margin-right: 5%;"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">
                                <asp:Literal ID="ltrlLastName" runat="server" Text="LAST NAME:"></asp:Literal>
                            </td>
                            <td style="width: 70%;">
                                <asp:TextBox ID="txtLastNameEditInfo" runat="server" Enabled="false" Style="width: 90%;
                                    margin-left: 5%; margin-right: 5%;"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">
                                <asp:Literal ID="ltrlEmail" runat="server" Text="EMAIL:"></asp:Literal>
                            </td>
                            <td style="width: 70%;">
                                <asp:TextBox ID="txtEmailEditInfo" runat="server" Enabled="false" Style="width: 90%;
                                    margin-left: 5%; margin-right: 5%;"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">
                                <asp:Literal ID="ltrlBirthDay" runat="server" Text="BIRTHDAY:"></asp:Literal>
                            </td>
                            <td style="width: 70%;">
                                <asp:TextBox ID="txtBirthDayEditInfo" runat="server" Enabled="false" Style="width: 40%;
                                    margin-left: 5%;"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">
                                <asp:Literal ID="ltrlAge" runat="server" Text="AGE:"></asp:Literal>
                            </td>
                            <td style="width: 70%;">
                                <asp:TextBox ID="txtAgeEditInfo" runat="server" ReadOnly="true" Style="width: 40%;
                                    margin-left: 5%;"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="width: 100%; text-align: left;">
                                <asp:Literal ID="ltrlBIO" runat="server" Text="BIO:"></asp:Literal>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="width: 100%;">
                                <asp:TextBox ID="txtBIOEditInfo" runat="server" Enabled="false" TextMode="MultiLine"
                                    Rows="5" Style="width: 90%; margin-left: 5%; margin-right: 5%;"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">
                                <asp:Literal ID="ltrlWaver" runat="server" Text="WAVER:"></asp:Literal>
                            </td>
                            <td style="width: 70%;">
                                <asp:TextBox ID="txtWaverEditInfo" runat="server" ReadOnly="true" Style="width: 40%;
                                    margin-left: 5%;"></asp:TextBox>
                                <div style="width: 90%;">
                                    <div id="div_attach" style="width: 30%; float: left;">
                                        <a href="#" id="a_attach" onclick="javascript:document.getElementById('div_uploadWaver').style.display='inline';">
                                            Attach</a>
                                    </div>
                                    <div id="div_lnkview" style="width: 30%; float: left;">
                                        <a id="a_download" target="_self">View</a>
                                    </div>
                                </div>
                                <div id="div_uploadWaver">
                                    <asp:FileUpload ID="fupWaverFileEditInfo" runat="server" Style="width: 90%; margin-left: 5%;
                                        margin-right: 5%;" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="width: 100%; text-align: left;">
                                <asp:Literal ID="ltrlOther" runat="server" Text="OTHER:"></asp:Literal>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="width: 100%;">
                                <asp:TextBox ID="txtOtherEditInfo" runat="server" Enabled="false" TextMode="MultiLine"
                                    Rows="3" Style="width: 90%; margin-left: 5%; margin-right: 5%;"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>
            </ContentTemplate>
            <Triggers>
                <asp:PostBackTrigger ControlID="btnSaveInfo" />
            </Triggers>
        </asp:UpdatePanel>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <ContentTemplate>
                <asp:GridView ID="gvActor" runat="server" CellPadding="2" AllowPaging="true" AllowSorting="true"
                    DataKeyNames="ActorId" AutoGenerateColumns="false" PageSize="15" OnPageIndexChanging="gvActor_PageIndexChanging"
                    OnRowCreated="gvActor_RowCreated" OnSorting="gvActor_Sorting" OnRowDataBound="gvActor_RowDataBound"
                    BorderColor="Black" BorderWidth="1" GridLines="None">
                    <HeaderStyle BorderColor="Black" BackColor="#00A2B0" Font-Bold="true" Font-Size="Medium"
                        ForeColor="white" />
                    <PagerStyle BackColor="#00A2B0" Font-Bold="true" Font-Size="Medium" ForeColor="white"
                        HorizontalAlign="left" />
                    <RowStyle BorderColor="Black" BorderWidth="1" />
                    <Columns>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:CheckBox ID="chkIsActive" runat="server" Checked='<%# Convert.ToBoolean(Eval("IsActive"))%>' />
                            </ItemTemplate>
                            <HeaderStyle Width="2%" HorizontalAlign="Center" BorderColor="Black" BorderWidth="1" />
                            <ItemStyle BorderColor="Black" BorderWidth="1" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="FIRST" SortExpression="FirstName">
                            <ItemTemplate>
                                <asp:Literal ID="litFirstName" runat="server" Text='<%#Eval("FirstName")%>'></asp:Literal>
                            </ItemTemplate>
                            <HeaderStyle Width="12%" HorizontalAlign="Left" BorderColor="Black" BorderWidth="1" />
                            <ItemStyle BorderColor="Black" BorderWidth="1" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="LAST" SortExpression="LastName">
                            <ItemTemplate>
                                <asp:Literal ID="litLastName" runat="server" Text='<%#Eval("LastName")%>'></asp:Literal>
                            </ItemTemplate>
                            <HeaderStyle Width="12%" HorizontalAlign="Left" BorderColor="Black" BorderWidth="1" />
                            <ItemStyle BorderColor="Black" BorderWidth="1" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="EMAIL" SortExpression="Email">
                            <ItemTemplate>
                                <asp:Literal ID="litEmail" runat="server" Text='<%#Eval("Email")%>'></asp:Literal>
                            </ItemTemplate>
                            <HeaderStyle Width="25%" HorizontalAlign="Left" BorderColor="Black" BorderWidth="1" />
                            <ItemStyle BorderColor="Black" BorderWidth="1" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="BIRTHDAY" SortExpression="BirthDate">
                            <ItemTemplate>
                                <asp:Literal ID="litBirthDate" runat="server" Text='<%# Convert.ToDateTime(Eval("BirthDate")).Date.ToShortDateString()%>'></asp:Literal>
                            </ItemTemplate>
                            <HeaderStyle Width="10%" HorizontalAlign="Center" BorderColor="Black" BorderWidth="1" />
                            <ItemStyle HorizontalAlign="Center" BorderColor="Black" BorderWidth="1" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="AGE" SortExpression="Age">
                            <ItemTemplate>
                                <asp:Literal ID="litAge" runat="server" Text='<%#Eval("Age")%>'></asp:Literal>
                            </ItemTemplate>
                            <HeaderStyle Width="5%" HorizontalAlign="Right" BorderColor="Black" BorderWidth="1" />
                            <ItemStyle HorizontalAlign="Right" BorderColor="Black" BorderWidth="1" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="BIO" SortExpression="Bio">
                            <ItemTemplate>
                                <asp:Literal ID="litBio" runat="server" Text='<%# Limit(Eval("Bio"),20) %>'></asp:Literal>
                            </ItemTemplate>
                            <HeaderStyle Width="20%" HorizontalAlign="Left" BorderColor="Black" BorderWidth="1" />
                            <ItemStyle BorderColor="Black" BorderWidth="1" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Document" HeaderStyle-Width="15%" SortExpression="ActorDocument">
                            <ItemTemplate>
                                <asp:Literal ID="litAttchDoc" runat="server" Text='<%#Eval("ActorDocument") %>'></asp:Literal>
                            </ItemTemplate>
                            <HeaderStyle Width="15%" HorizontalAlign="Left" BorderColor="Black" BorderWidth="1" />
                            <ItemStyle BorderColor="Black" BorderWidth="1" />
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
            </ContentTemplate>
        </asp:UpdatePanel>
        <asp:UpdatePanel ID="UpdatePanel2" runat="server" UpdateMode="Conditional">
            <ContentTemplate>
                <div style="width: 100%;">
                    <div style="width: 100%; font-family: Comic Sans MS; font-size: x-large;">
                        <asp:Literal ID="litNew" runat="server" Text="NEW"></asp:Literal>
                    </div>
                    <div style="width: 100%;">
                        <div style="width: 9%; float: left;">
                            <input type="text" value="First Name" id="txtFirstName" runat="server" onfocus="javascript:if(this.value=='First Name'){this.value='';}"
                                onblur="javascript:if(this.value==''){this.value='First Name';}" style="width: 95%;" />
                        </div>
                        <div style="width: 9%; float: left;">
                            <input type="text" value="Last Name" id="txtLastName" runat="server" onfocus="javascript:if(this.value=='Last Name'){this.value='';}"
                                onblur="javascript:if(this.value==''){this.value='Last Name';}" style="width: 95%;" />
                        </div>
                        <div style="width: 15%; float: left;">
                            <input type="text" value="EMAIL" id="txtEmailID" runat="server" onfocus="javascript:if(this.value=='EMAIL'){this.value='';}"
                                onblur="javascript:if(this.value==''){this.value='EMAIL';}" style="width: 95%;" />
                        </div>
                        <div style="width: 9%; float: left;">
                            <input type="text" value="mm/dd/yyyy" id="txtDOB" runat="server" onfocus="javascript:if(this.value=='mm/dd/yyyy'){this.value='';}"
                                onblur="javascript:if(this.value==''){this.value='mm/dd/yyyy';}" style="width: 95%;" />
                        </div>
                        <div style="width: 20%; float: left;">
                            <input type="text" style="width: 95%" value="BIO" id="txtBIO" runat="server" onfocus="javascript:if(this.value=='BIO'){this.value='';}"
                                onblur="javascript:if(this.value==''){this.value='BIO';}" />
                        </div>
                        <div style="width: 25%; float: left;">
                            <asp:FileUpload ID="fuAttchment" runat="server" Width="95%" />
                        </div>
                        <div>
                            <asp:Button ID="btnAdd" runat="server" Text="Add" CssClass="botton" OnClick="btnAdd_Click"
                                OnClientClick="return CheckValideData();" />
                        </div>
                    </div>
                </div>
            </ContentTemplate>
            <Triggers>
                <asp:PostBackTrigger ControlID="btnAdd" />
            </Triggers>
        </asp:UpdatePanel>
    </div>
</asp:Content>
