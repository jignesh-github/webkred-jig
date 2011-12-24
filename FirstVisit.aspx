<%@ Page Title="" Language="C#" MasterPageFile="~/MasterLinkSpace.master" AutoEventWireup="true"
    CodeFile="FirstVisit.aspx.cs" Inherits="WebKred.FirstVisit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="first-visit-main">
        <br />
        <a href="#">Create Your First Project</a>
        <br />
        It takes just a few seconds and you will be good to go !
        <br />
        <br />
        <div id="divFirstVisitVideo" runat="server">
            Watch a quick Get Started Video
            <br />
            <br />
            <a href="VideoDisplay.aspx" target="_blank">
                <img height="400px" src="Images/First-Visit.png" alt="First Visit Video" />
            </a>
        </div>
    </div>
</asp:Content>
