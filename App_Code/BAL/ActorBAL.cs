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
    public class ActorBAL
    {
        #region Variables

        ActorDAL actorDAL = new ActorDAL();
        DataTable dt = new DataTable();
        int result = 0;

        #endregion Variables

        #region Properties

        int actorId = 0;
        public int ActorId
        {
            get { return actorId; }
            set { actorId = value; }
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

        DateTime birthDate;
        public DateTime BirthDate
        {
            get { return birthDate; }
            set { birthDate = value; }
        }

        int age = 0;
        public int Age
        {
            get { return age; }
            set { age = value; }
        }

        string bio = "";
        public string Bio
        {
            get { return bio; }
            set { bio = value; }
        }

        string actorDocument = "";
        public string ActorDocument
        {
            get { return actorDocument; }
            set { actorDocument = value; }
        }

        string other = "";
        public string Other
        {
            get { return other; }
            set { other = value; }
        }

        int projectId = 0;
        public int ProjectId
        {
            get { return projectId; }
            set { projectId = value; }
        }

        bool isActive = true;
        public bool IsActive
        {
            get { return isActive; }
            set { isActive = value; }
        }

        #endregion Properties

        #region Method

        public DataTable ActorSelect()
        {
            try
            {
                dt = actorDAL.ActorSelect(this);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable ActorSelectForDropDown()
        {
            try
            {
                dt = actorDAL.ActorSelectForDropDown();
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int ActorInsert()
        {
            try
            {
                result = actorDAL.ActorInsert(this);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void ActorActiveInActive()
        {
            try
            {
                actorDAL.ActorActiveInActive(this);
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Method
    }
}