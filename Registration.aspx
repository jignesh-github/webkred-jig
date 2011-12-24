<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true"
    CodeFile="Registration.aspx.cs" Inherits="WebKred.Registration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
    </asp:ScriptManager>

    <script type="text/javascript" language="javascript">

        function CheckUser(obj) {
            //alert(obj.value);
            PageMethods.CheckUser(obj.value, OnSucceeded, OnFailed);
        }

        function OnSucceeded(result, userContext, methodName) {
            if (result != null) {
                //alert(result);
                if (result) {
                    var txtUserName = document.getElementById('<%= txtUserName.ClientID %>');
                    alert("User name " + txtUserName.value + " already exists. Please enter another name.");
                    //txtUserName.value = "";
                    txtUserName.focus();
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

    <div style="margin-left: 20px; margin-top: 10px;">
        <div>
            So Close, you are almost ready to start using Webkred account!
        </div>
        <br />
        <table width="100%" border="0">
            <tr>
                <td width="15%">
                    First Name :
                </td>
                <td width="20%">
                    <asp:TextBox ID="txtFirstName" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvFirstName" runat="server" ControlToValidate="txtFirstName"
                        ErrorMessage="Please enter first name." Display="Dynamic"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    Last Name :
                </td>
                <td>
                    <asp:TextBox ID="txtLastName" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvLastName" runat="server" ControlToValidate="txtLastName"
                        ErrorMessage="Please enter last name." Display="Dynamic"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    Email :
                </td>
                <td>
                    <asp:TextBox ID="txtEmail" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RegularExpressionValidator ID="revEmail" runat="server" ErrorMessage="Please Enter Valid Email Address."
                        ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ControlToValidate="txtEmail"
                        Display="Dynamic"></asp:RegularExpressionValidator>
                    <asp:RequiredFieldValidator ID="rfvEmail" runat="server" ControlToValidate="txtEmail"
                        ErrorMessage="Please enter email." Display="Dynamic"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    Company:
                </td>
                <td>
                    <asp:TextBox ID="txtCompany" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvCompany" runat="server" ControlToValidate="txtCompany"
                        ErrorMessage="Please enter compay." Display="Dynamic"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    Subdomain
                </td>
                <td>
                    <asp:TextBox ID="txtSubdomain" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvSubDomain" runat="server" ControlToValidate="txtSubdomain"
                        ErrorMessage="Please enter subdomain." Display="Dynamic"></asp:RequiredFieldValidator>
                    This is your very own project space found at: username.webkred.com!
                </td>
            </tr>
        </table>
        <br />
        <table width="100%" border="0">
            <tr>
                <td width="15%">
                    User Name :
                </td>
                <td width="20%">
                    <asp:TextBox ID="txtUserName" runat="server" onblur="CheckUser(this)"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvUserName" runat="server" ControlToValidate="txtUserName"
                        ErrorMessage="Please enter user name." Display="Dynamic"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    Password:
                </td>
                <td>
                    <asp:TextBox ID="txtPassword1" runat="server" TextMode="Password"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvPassword" runat="server" ControlToValidate="txtPassword1"
                        ErrorMessage="Please enter password." Display="Dynamic"></asp:RequiredFieldValidator>
                    <asp:RegularExpressionValidator ID="revPassword1" runat="server" ControlToValidate="txtPassword1"
                        Display="Dynamic" ErrorMessage="Plesae enter atleast six character with one number."
                        ValidationExpression="(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,30})$"></asp:RegularExpressionValidator>
                </td>
            </tr>
            <tr>
                <td>
                    Comfirm Password :
                </td>
                <td>
                    <asp:TextBox ID="txtPassword2" runat="server" TextMode="Password"></asp:TextBox>
                </td>
                <td>
                    <asp:CompareValidator ID="cmPassword" runat="server" ControlToCompare="txtPassword1"
                        ControlToValidate="txtPassword2" ErrorMessage="Password does not match." Display="Dynamic"></asp:CompareValidator>
                </td>
            </tr>
        </table>
        <br />
        <table width="100%" border="0">
            <tr>
                <td width="15%">
                    Card Number :
                </td>
                <td width="20%">
                    <asp:TextBox ID="txtCardNumber" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvCardNumber" runat="server" ControlToValidate="txtCardNumber"
                        ErrorMessage="Please enter card number." Display="Dynamic"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    Expires On :
                </td>
                <td>
                    <asp:DropDownList ID="ddlMonth" runat="server">
                        <asp:ListItem Text="Jan" Value="Jan"></asp:ListItem>
                        <asp:ListItem Text="Feb" Value="Feb"></asp:ListItem>
                        <asp:ListItem Text="Mar" Value="Mar"></asp:ListItem>
                        <asp:ListItem Text="Apr" Value="Apr"></asp:ListItem>
                        <asp:ListItem Text="May" Value="May"></asp:ListItem>
                        <asp:ListItem Text="Jun" Value="Jun"></asp:ListItem>
                        <asp:ListItem Text="Jul" Value="Jul"></asp:ListItem>
                        <asp:ListItem Text="Aug" Value="Aug"></asp:ListItem>
                        <asp:ListItem Text="Sep" Value="Sep"></asp:ListItem>
                        <asp:ListItem Text="Oct" Value="Oct"></asp:ListItem>
                        <asp:ListItem Text="Nov" Value="Nov"></asp:ListItem>
                        <asp:ListItem Text="Dec" Value="Dec"></asp:ListItem>
                    </asp:DropDownList>
                    <asp:DropDownList ID="ddlYear" runat="server">
                        <asp:ListItem Text="2013" Value="2013"></asp:ListItem>
                        <asp:ListItem Text="2014" Value="2014"></asp:ListItem>
                        <asp:ListItem Text="2015" Value="2015"></asp:ListItem>
                        <asp:ListItem Text="2016" Value="2016"></asp:ListItem>
                        <asp:ListItem Text="2017" Value="2017"></asp:ListItem>
                        <asp:ListItem Text="2018" Value="2018"></asp:ListItem>
                        <asp:ListItem Text="2019" Value="2019"></asp:ListItem>
                        <asp:ListItem Text="2020" Value="2020"></asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    Billing Zip:
                </td>
                <td>
                    <asp:TextBox ID="txtBillingZip" runat="server" Height="22px"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvBillingZip" runat="server" ControlToValidate="txtBillingZip"
                        ErrorMessage="Please enter billing zip." Display="Dynamic"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>
                    Coupon :
                </td>
                <td>
                    <asp:TextBox ID="txtCoupon" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="rfvCoupon" runat="server" ControlToValidate="txtCoupon"
                        ErrorMessage="Please enter coupon."></asp:RequiredFieldValidator>
                </td>
            </tr>
        </table>
        <br />
        <div>
            By clicking create my account you agree to the <a href="#">Terms of Service</a>
            <a href="#">Privacy</a> and <a href="#">Refund Policy</a>
        </div>
        <br />
        <asp:Button ID="btnCreateMyAccount" runat="server" Text="Create My Account" OnClick="btnCreateMyAccount_Click" />
    </div>
</asp:Content>
