<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>RSS Feed - <xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="utf-8" />
        <style type="text/css">
          body { font-family: sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #333; }
          .header { border-bottom: 2px solid #ea580c; padding-bottom: 20px; margin-bottom: 40px; }
          h1 { color: #ea580c; }
          .item { margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
          .item a { font-size: 1.2rem; font-weight: bold; color: #ea580c; text-decoration: none; }
          .item a:hover { text-decoration: underline; }
          .date { font-size: 0.9rem; color: #666; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>RSS Subscription Feed</h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
          <p>This is an RSS feed. Copy the URL into your news reader to subscribe!</p>
        </div>
        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <a href="{link}"><xsl:value-of select="title"/></a>
            <div class="date"><xsl:value-of select="pubDate"/></div>
            <p><xsl:value-of select="description"/></p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>