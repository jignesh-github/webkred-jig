using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Data.SqlClient;

namespace WebKred
{
    public class UserBAL
    {
        #region Variables

        UserDAL userDAL = new UserDAL();

        #endregion

        #region Properties

        int userId = 0;
        public int UserId
        {
            get { return userId; }
            set { userId = value; }
        }

        string firstName = "";
        public string FirstName
        {
            get { return firstName; }
            set { firstName = value; }
        }

        string lastName = "";
        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }

        string email = "";
        public string Email
        {
            get { return email; }
            set { email = value; }
        }

        string userName = "";
        public string UserName
        {
            get { return userName; }
            set { userName = value; }
        }

        string userPassword = "";
        public string UserPassword
        {
            get { return userPassword; }
            set { userPassword = value; }
        }

        string title = "";
        public string Title
        {
            get { return title; }
            set { title = value; }
        }

        string officeNo = "";
        public string OfficeNo
        {
            get { return officeNo; }
            set { officeNo = value; }
        }

        string mobileNo = "";
        public string MobileNo
        {
            get { return mobileNo; }
            set { mobileNo = value; }
        }

        int userRoleId = 0;
        public int UserRoleId
        {
            get { return userRoleId; }
            set { userRoleId = value; }
        }

        int companyId = 0;
        public int CompanyId
        {
            get { return companyId; }
            set { companyId = value; }
        }

        #endregion Properties

        #region Methods
       
        public DataTable UserSelect()
        {
            try
            {
                return userDAL.UserSelect(this);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public int UserInsert()
        {
            try
            {
                return userDAL.UserInsert(this);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public DataTable UserCheck()
        {
            try
            {
                return userDAL.UserCheck(this);

            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public bool CheckUserNameExists()
        {
            return userDAL.CheckUserNameExists(this.userName);
        }

        #endregion Methods        
    }
}