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
    public class ActorDAL
    {
        #region Variables

        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;
        SqlConnection con;

        #endregion Variables

        #region Method

        public DataTable ActorSelect(ActorBAL actorBAL)
        {
            try
            {
                dt = new DataTable();
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("ActorSelect", con);
                cmd.Parameters.AddWithValue("@ActorId", actorBAL.ActorId);
                sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
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
                dt = new DataTable();
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("ActorSelectForDropDown", con);
                sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int ActorInsert(ActorBAL actorBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("ActorInsert", con);
                con.Open();

                cmd.Parameters.AddWithValue("@FirstName", actorBAL.FirstName);
                cmd.Parameters.AddWithValue("@LastName", actorBAL.LastName);
                cmd.Parameters.AddWithValue("@Email", actorBAL.Email);
                cmd.Parameters.AddWithValue("@BirthDate", actorBAL.BirthDate);
                cmd.Parameters.AddWithValue("@Bio", actorBAL.Bio);
                cmd.Parameters.AddWithValue("@ActorDocument", actorBAL.ActorDocument);
                cmd.Parameters.AddWithValue("@Other", actorBAL.Other);
                cmd.Parameters.AddWithValue("@ProjectId", actorBAL.ProjectId);
                cmd.Parameters.AddWithValue("@IsActive", actorBAL.IsActive);

                cmd.Parameters.AddWithValue("@ActorId", actorBAL.ActorId);
                cmd.Parameters["@ActorId"].Direction = ParameterDirection.InputOutput;

                cmd.ExecuteNonQuery();
                con.Close();

                int actorId = Convert.ToInt32(cmd.Parameters["@ActorId"].Value);
                return actorId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                    con.Close();
            }
        }

        public void ActorActiveInActive(ActorBAL actorBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("ActorActiveInActive", con);
                con.Open();
                cmd.Parameters.AddWithValue("@ActorId", actorBAL.ActorId);
                cmd.Parameters.AddWithValue("@IsActive", actorBAL.IsActive);

                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (con.State != ConnectionState.Closed)
                    con.Close();
            }
        }

        #endregion Method
    }
}