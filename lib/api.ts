const mariadb = require("mariadb")

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const conn = await mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
  });
  await conn.execute("USE risklick_blog")
  let selection: string = "";
  fields.forEach((str, index) => {
    if(index === fields.length - 1) {
      selection = selection + str
    }else{
      selection = selection + str + ", "
    }
  })
  const convertedSlug = "'" + slug + "'";
  let rows = await conn.query("SELECT " + selection + " FROM blog_posts WHERE slug = " + convertedSlug);
  rows = JSON.parse(JSON.stringify(rows[0]))
  console.log(rows)
  return rows
}

export async function getComments(bid) {
  const conn = await mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
  });
  await conn.execute("USE risklick_blog")
  let rows = await conn.query("SELECT * FROM blog_comments WHERE blog_id=" + bid)  
  rows = JSON.parse(JSON.stringify(rows))
  return rows
}

export async function getAllPosts(fields: string[] = []) {
  const conn = await mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
  });
    await conn.execute("USE risklick_blog")
    let selection: string = "";
    fields.forEach((str, index) => {
      if(index === fields.length - 1) {
        selection = selection + str
      }else{
        selection = selection + str + ", "
      }
    })
	  let rows = await conn.query("SELECT " + selection + " FROM blog_posts");
    rows = JSON.parse(JSON.stringify(rows))
    return rows
}

async function getPostSlug() {
  const conn = await mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
  });
  await conn.execute("USE risklick_blog")
	let rows = await conn.query("SELECT slug FROM blog_posts");
  rows = JSON.parse(JSON.stringify(rows))
  return rows
}

async function getPosts(){
  let conn;
  try {
    conn = await mariadb.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
    });
    await conn.execute("USE risklick_blog")
    let rows = await conn.query("SELECT * FROM blog_posts");
    rows = JSON.parse(JSON.stringify(rows))
    return rows
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.close();
  }
}

export async function sendComment(comment: string, author: string, bid: number) {
  const conn = await mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
  });
  await conn.execute("USE risklick_blog")
  await conn.execute(insertComment(comment, author, new Date(), bid));
}


function insertComment(comment: string, author: string, date: Date, bid: number) {
  return `INSERT INTO blog_comments VALUES ('${date.toISOString().slice(0, 10)}', '${author}', '${comment}', '${bid}')`
}