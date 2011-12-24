<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="WebKred.Login" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajax" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>WebKred Login</title>
    <link rel="stylesheet" type="text/css" href="CSS/StyleSheet.css" />

    <script language="javascript" type="text/javascript">

        function ForgotPasswordWindow(theURL, winName, features) {
            window.open(theURL, winName, features);
        }

        function AtLeastOneNumber() {
            var txtPass = document.getElementById("<%=txtPassword.ClientID%>").value;
            var btnSign = document.getElementById("<%=btnSignIn.ClientID%>");
            var mystring = new String(txtPass)


            if (txtPass.length <= 5) {
                btnSign.disabled = 'disabled';
                msg2.innerHTML = " Please Enter more than 6 character";
                return false;
            }
            else {
                if (mystring.search(/[0-9]+/) == -1) // Check at-leat one number
                {
                    btnSign.disabled = 'disabled';
                    msg2.innerHTML = "Enter At Least one Number";
                    return false;
                }
                else {
                    btnSign.disabled = '';
                    msg2.innerHTML = '';
                    return true;
                }
            }
        }            </script>

</head>
<body>
    <form id="form1" runat="server" style="position: relative">
    <div class="main-login">
        <%--<asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>--%>
        <div class="verdana14blue">
            WEBKRED</div>
        <div class="loginbox">
            <div class=" verdana12black">
                Username</div>
            <div class="padtop10px">
            </div>
            <div>
                <asp:TextBox ID="txtUserName" runat="server" CssClass="inputtext" TabIndex="1"></asp:TextBox>
            </div>
            <div>
                <asp:RequiredFieldValidator ID="RequiredFieldValidatorUserName" runat="server" Display="Dynamic"
                    ErrorMessage="User Name Required !" ControlToValidate="txtUserName" ValidationGroup="validUser"
                    CssClass="error-msg"></asp:RequiredFieldValidator>
            </div>
            <div class=" verdana12black">
                Password</div>
            <div class="padtop10px">
            </div>
            <div>
                <asp:TextBox ID="txtPassword" ValidationGroup="validUser" TextMode="Password" runat="server"
                    CssClass="inputtext" onkeyup="javascript:AtLeastOneNumber()" TabIndex="2"></asp:TextBox>
            </div>
            <div id="msg2" class="error-msg">
                <asp:RequiredFieldValidator ID="RequiredFieldValidatortxtPassword" runat="server"
                    Display="Dynamic" ErrorMessage="Password Required !" ControlToValidate="txtPassword"
                    ValidationGroup="validUser" CssClass="error-msg"></asp:RequiredFieldValidator>
            </div>
            <div class=" verdana12black">
                <%--<input type="checkbox" name="checkbox" id="checkbox" class="chack" />--%>
                <asp:CheckBox ID="chkRememberMe" runat="server" TabIndex="3" />
                Remember me on This Computer</div>
            <div class="padtop10px">
            </div>
            <div>
                <asp:Button ID="btnSignIn" ValidationGroup="validUser" runat="server" Text="SignIn"
                    CssClass="botton" OnClick="btnSignIn_Click" CausesValidation="true" UseSubmitBehavior="true"
                    TabIndex="4" />
            </div>
            <div>
                <asp:Label ID="lblErrorMsg" runat="server" CssClass="error-msg"></asp:Label>
            </div>
            <div class="verdana12black">
                Help <a href="" tabindex="5" onclick="javascript:ForgotPasswordWindow('ForgotPassword.aspx','','width=600,height=350')">
                    I Forgot my username/password</a></div>
        </div>
        <div class="padtop10px">
        </div>
        <div class="padtop10px">
        </div>
    </div>
    </form>
</body>
</html>
