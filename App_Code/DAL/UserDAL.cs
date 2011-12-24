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
    public class UserDAL
    {
        #region Variabels

        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt = new DataTable();
        SqlConnection con;
        string query;

        #endregion

        #region Methods

        internal DataTable UserSelect(UserBAL userBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("UserSelect", con);
                cmd.Parameters.AddWithValue("@userId", userBAL.UserId);

                sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        internal int UserInsert(UserBAL userBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("UserInsert", con);
                con.Open();

                cmd.Parameters.AddWithValue("@firstName", userBAL.FirstName);
                cmd.Parameters.AddWithValue("@lastName", userBAL.LastName);
                cmd.Parameters.AddWithValue("@email", userBAL.Email);
                cmd.Parameters.AddWithValue("@userName", userBAL.UserName);
                cmd.Parameters.AddWithValue("@userPassword", userBAL.UserPassword);
                cmd.Parameters.AddWithValue("@title", userBAL.Title);
                cmd.Parameters.AddWithValue("@officeNo", userBAL.OfficeNo);
                cmd.Parameters.AddWithValue("@mobileNo", userBAL.MobileNo);
                cmd.Parameters.AddWithValue("@userRoleId", userBAL.UserRoleId);
                cmd.Parameters.AddWithValue("@companyId", userBAL.CompanyId);

                cmd.Parameters.AddWithValue("@userId", userBAL.UserId);
                cmd.Parameters["@userId"].Direction = ParameterDirection.InputOutput;

                cmd.ExecuteNonQuery();
                int userId = Convert.ToInt32(cmd.Parameters["@userId"].Value);
                con.Close();

                return userId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                {
                    con.Close();
                }
            }
        }

        internal DataTable UserCheck(UserBAL userBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("UserCheck", con);
                cmd.Parameters.AddWithValue("@userName", userBAL.UserName);
                cmd.Parameters.AddWithValue("@userPassword", userBAL.UserPassword);

                sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        internal bool CheckUserNameExists(string userName)
        {
            bool isUserNameExist;
            int userCount = 0;

            query = "Select COUNT(*) From Users Where UserName = '" + userName + "'";

            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand(query, con);
                cmd.CommandType = CommandType.Text;

                con.Open();
                userCount = Convert.ToInt32(cmd.ExecuteScalar());
                con.Close();
            }
            catch (SqlException ex)
            {
                throw ex;
            }

            isUserNameExist = userCount == 0 ? false : true;

            return isUserNameExist;
        }

        #endregion Methods
    }
}