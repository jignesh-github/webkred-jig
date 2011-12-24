using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Collections;
using Newtonsoft.Json;
using System.Xml;
using System.Data;

namespace WebKred
{
    public class LinkSpaceEntity
    {
        [JsonProperty("LinkSpaceId")]
        public int linkSpaceId;
        [JsonProperty("ForumURL")]
        public string ForumURL;
        [JsonProperty("ForumContent")]
        public string ForumContent;
        [JsonProperty("ActorId")]
        public int ActorId;
        [JsonProperty("ActorName")]
        public string ActorName;
        [JsonProperty("UserName")]
        public string UserName;
        [JsonProperty("Password")]
        public string Password;
        [JsonProperty("ReplyContent")]
        public string ReplyContent;
        [JsonProperty("ReplyURL")]
        public string ReplyURL;
        [JsonProperty("ProjectId")]
        public int ProjectId;
    }

    public class LinkSpaceEntityWrapper : LinkSpaceEntity
    {
        [JsonProperty("__gt_sn__")]
        public int gtSn;
        [JsonProperty("__gt_no_valid__")]
        public bool gtNoValidation;
        [JsonProperty("__gt_row_index__")]
        public int gtRowIndex;
    }

    public class LinkSpaceDAL
    {
        SqlConnection con;
        SqlCommand cmd;
        SqlDataAdapter sda;

        //private const string connectionString = @"Data Source=NCT120;Initial Catalog=WebKred;Persist Security Info=True;User ID=sa;Password=sql2008";    

        private string getSQL(int pageIndex, int recNo, int projectId)
        {
            string columns = "LinkSpaceId, ForumURL, ForumContent, L.ActorId, A.FirstName + ' ' + A.LastName + ',' + str(A.ActorId) AS ActorName, UserName, Password, ReplyContent, ReplyURL, L.ProjectId";
            string query = null;
            if (recNo == -1)
            {
                query = "Select " + columns + " from LinkSpace L INNER JOIN Actor A ON (A.ActorId = L.ActorId) WHERE L.ProjectId = " + projectId + " Order by LinkSpaceId";
            }
            else
            {
                query = "SELECT LinkSpaceId, ForumURL, ForumContent, ActorId, ActorName, UserName, Password, ReplyContent, ReplyURL, ProjectId FROM (";
                query += "SELECT ROW_NUMBER() OVER (ORDER BY LinkSpaceId) AS RowNumber, " + columns + " FROM LinkSpace L INNER JOIN Actor A ON (A.ActorId = L.ActorId) WHERE L.ProjectId = " + projectId + ") AS tmp ";
                query += "WHERE RowNumber BETWEEN " + ((pageIndex - 1) * recNo + 1) + " AND " + pageIndex * recNo + " ORDER BY LinkSpaceId";
            }

            return query;
        }

        private SqlDataReader getLinkSpaceList(int pageIndex, int recNo, int projectId)
        {
            string query = getSQL(pageIndex, recNo, projectId);
            SqlConnection conn = Connection.GetConnection();
            conn.Open();
            SqlDataReader dataReader = new SqlCommand(query, conn).ExecuteReader();
            return dataReader;
        }

        public XmlDataDocument getLinkSpaceXml(int pageIndex, int recNo)
        {

            string query = getSQL(pageIndex, recNo, 0);
            SqlConnection conn = Connection.GetConnection();


            //Create a DataAdapter to load data from original data source to the DataSet
            DataSet dataset = new DataSet("root");
            dataset.EnforceConstraints = false;
            SqlDataAdapter adapter = new SqlDataAdapter();
            adapter.SelectCommand = new SqlCommand(query, conn);
            conn.Open();
            adapter.Fill(dataset, "data");

            //Create a virtual XML document on top of the DataSet
            XmlDataDocument doc = new XmlDataDocument(dataset);

            return doc;

        }

        public int getLinkSpaceCount()
        {
            string query = "select count(*) from LinkSpace";

            SqlConnection conn = Connection.GetConnection();
            conn.Open();
            int ret = Convert.ToInt32((new SqlCommand(query, conn)).ExecuteScalar());
            return ret;
        }

        public string[][] get2dArray(int pageIndex, int recNo)
        {
            SqlDataReader dataReader = getLinkSpaceList(pageIndex, recNo, 0);
            ArrayList al = new ArrayList();

            string s = "<select id=\"ddlActor\" onchange=\"actorChange(this.value)\"> " +
            "<option value=\"1\">one</option>" +
            "<option value=\"2\">two</option>" +
            "<option value=\"3\">three</option>" +
            "</select> <span id=\"hid\"></span>";

            if ((dataReader != null) && (dataReader.HasRows))
            {
                while (dataReader.Read())
                {
                    string[] fields = new string[dataReader.FieldCount];

                    for (int i = 0; i < dataReader.FieldCount; ++i)
                    {
                        if (i == 4)
                        {
                            fields[i] = s;
                        }
                        else
                        {
                            fields[i] = dataReader[i].ToString();
                        }
                    }

                    al.Add(fields);
                }
            }

            dataReader.Close();
            string[][] arrReturn = (string[][])al.ToArray(typeof(string[]));
            return arrReturn;
        }

        public LinkSpaceEntity[] getLinkSpaceArray(int pageIndex, int recNo, int projectId)
        {
            SqlDataReader dataReader = getLinkSpaceList(pageIndex, recNo, projectId);

            ArrayList al = new ArrayList();
            if ((dataReader != null) && (dataReader.HasRows))
            {
                while (dataReader.Read())
                {
                    LinkSpaceEntity eo = new LinkSpaceEntity();

                    eo.linkSpaceId = Convert.ToInt32(dataReader["LinkSpaceId"]);
                    eo.ForumURL = dataReader["ForumURL"].ToString();
                    eo.ForumContent = dataReader["ForumContent"].ToString();
                    eo.ActorId = Convert.ToInt32(dataReader["ActorId"]);
                    eo.ActorName = dataReader["ActorName"].ToString();
                    eo.UserName = dataReader["UserName"].ToString();
                    eo.Password = dataReader["Password"].ToString();
                    eo.ReplyContent = dataReader["ReplyContent"].ToString();
                    eo.ReplyURL = dataReader["ReplyURL"].ToString();
                    eo.ProjectId = Convert.ToInt32(dataReader["ProjectId"]);

                    al.Add(eo);
                }
            }

            dataReader.Close();
            LinkSpaceEntity[] arrReturn = (LinkSpaceEntity[])al.ToArray(typeof(LinkSpaceEntity));
            return arrReturn;
        }

        public void DeleteLinkSpaces(LinkSpaceEntity[] oe)
        {
            SqlConnection conn = Connection.GetConnection();
            string query = "delete from LinkSpace where LinkSpaceId = @LinkSpaceId";
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlParameter pLinkSpaceId = cmd.Parameters.Add("@LinkSpaceId", SqlDbType.Int);

            try
            {
                conn.Open();
                for (int i = 0; i < oe.Length; i++)
                {
                    pLinkSpaceId.Value = oe[i].linkSpaceId;
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }

        public void InsertLinkSpaces(LinkSpaceEntity[] oe, int projectId)
        {
            SqlConnection conn = Connection.GetConnection();

            string query = "insert into LinkSpace(ForumURL,ForumContent,ActorId,UserName,Password,ReplyContent,ReplyURL,ProjectId) ";
            query += "values(@ForumURL,@ForumContent,@ActorId,@UserName,@Password,@ReplyContent,@ReplyURL,@ProjectId)";

            SqlCommand cmd = new SqlCommand(query, conn);
            SqlParameter pForumURL = cmd.Parameters.Add("@ForumURL", SqlDbType.VarChar);
            SqlParameter pForumContent = cmd.Parameters.Add("@ForumContent", SqlDbType.VarChar);
            SqlParameter pActorId = cmd.Parameters.Add("@ActorId", SqlDbType.Int);
            SqlParameter pUserName = cmd.Parameters.Add("@UserName", SqlDbType.VarChar);
            SqlParameter pPassword = cmd.Parameters.Add("@Password", SqlDbType.VarChar);
            SqlParameter pReplyContent = cmd.Parameters.Add("@ReplyContent", SqlDbType.VarChar);
            SqlParameter pReplyURL = cmd.Parameters.Add("@ReplyURL", SqlDbType.VarChar);
            SqlParameter pProjectId = cmd.Parameters.Add("@ProjectId", SqlDbType.Int);

            try
            {
                conn.Open();

                for (int i = 0; i < oe.Length; i++)
                {
                    pForumURL.Value = oe[i].ForumURL;
                    pForumContent.Value = oe[i].ForumContent;

                    string[] actorInfo = oe[i].ActorName.Split(',');
                    string actorId = actorInfo[actorInfo.Length - 1];

                    pActorId.Value = actorId;
                    pUserName.Value = oe[i].UserName;
                    pPassword.Value = oe[i].Password;
                    pReplyContent.Value = oe[i].ReplyContent;
                    pReplyURL.Value = oe[i].ReplyURL;
                    pProjectId.Value = projectId;

                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }

        public void UpdateLinkSpaces(LinkSpaceEntity[] oe, int projectId)
        {
            SqlConnection conn = Connection.GetConnection();

            string query = "update LinkSpace set ForumURL=@ForumURL, ForumContent=@ForumContent, ActorId=@ActorId,";
            query += "UserName=@UserName, Password=@Password, ReplyContent=@ReplyContent, ReplyURL=@ReplyURL,";
            query += "ProjectId=@ProjectId where LinkSpaceId = @LinkSpaceId ";

            SqlCommand cmd = new SqlCommand(query, conn);
            SqlParameter pLinkSpaceId = cmd.Parameters.Add("@LinkSpaceId", SqlDbType.Int);
            SqlParameter pForumURL = cmd.Parameters.Add("@ForumURL", SqlDbType.VarChar);
            SqlParameter pForumContent = cmd.Parameters.Add("@ForumContent", SqlDbType.VarChar);
            SqlParameter pActorId = cmd.Parameters.Add("@ActorId", SqlDbType.Int);
            SqlParameter pUserName = cmd.Parameters.Add("@UserName", SqlDbType.VarChar);
            SqlParameter pPassword = cmd.Parameters.Add("@Password", SqlDbType.VarChar);
            SqlParameter pReplyContent = cmd.Parameters.Add("@ReplyContent", SqlDbType.VarChar);
            SqlParameter pReplyURL = cmd.Parameters.Add("@ReplyURL", SqlDbType.VarChar);
            SqlParameter pProjectId = cmd.Parameters.Add("@ProjectId", SqlDbType.Int);

            try
            {
                conn.Open();
                for (int i = 0; i < oe.Length; i++)
                {
                    pLinkSpaceId.Value = oe[i].linkSpaceId;
                    pForumURL.Value = oe[i].ForumURL;
                    pForumContent.Value = oe[i].ForumContent;

                    string[] actorInfo = oe[i].ActorName.Split(',');
                    string actorId = actorInfo[actorInfo.Length - 1];

                    pActorId.Value = actorId;
                    pUserName.Value = oe[i].UserName;
                    pPassword.Value = oe[i].Password;
                    pReplyContent.Value = oe[i].ReplyContent;
                    pReplyURL.Value = oe[i].ReplyURL;
                    pProjectId.Value = projectId;
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }

        public DataTable getLinkSpaceData(int projectId)
        {
            try
            {
                string sql = "select L.ForumURL,ForumContent,A.FirstName +' '+ A.LastName AS ActorName,L.UserName,L.Password,L.ReplyContent,L.ReplyURL from LinkSpace L INNER JOIN Actor A ON (A.ActorId = L.ActorId) WHERE L.ProjectId = " + projectId + " order by LinkSpaceId";
                DataTable dt = new DataTable();
                con = Connection.GetConnection();
                cmd = Connection.GetCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}