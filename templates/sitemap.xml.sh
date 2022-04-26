set -eu

# TODO(fmrsn): lastmod should be stat(index.html).mtime instead.
cat <<EOF
<urlset>
	<url>
		<loc>https://$SITE</loc>
		<lastmod>$(date -u +%F)</lastmod>
		<priority>0.8</priority>
	</url>
</urlset>
EOF
