(function(e) {
	function t(t, n, s, d, y, b, w, E, S, x, T) {
		var N = e(".stream", y),
			C = [],
			k = "",
			L = 300,
			A = [],
			O, M, _, D = b.limit,
			P = [],
			H;
		frl = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + D + "&callback=?&q=";
		switch (t) {
			case "facebook":
				M = "https://www.facebook.com/KardashianBeauty";
				var B = n.split("/");
//console.log(n);
//console.log(B);
				_ = _ = B.length > 1 ? "https://graph.facebook.com/" + B[1] + "/photos?fields=id,link,from,name,picture,images,comments&limit=" + D : frl + encodeURIComponent("https://www.facebook.com/feeds/page.php?id=" + n + "&format=rss20");
//console.log(_);
				break;
			case "twitter":
				var j = d.url.replace(/\&#038;/gi, "&");
				var B = n.split("/"),
					F = n.split("#"),
					I = d.url.split("?"),
					q = d.replies == true ? "&exclude_replies=false" : "&exclude_replies=true";
				var R = "&include_entities=true&include_rts=" + d.retweets + q;
				X = I.length > 1 ? j + "&" : j + "?";
				_ = B.length > 1 ? X + "url=list&list_id=" + B[1] + "&per_page=" + D + R : X + "url=timeline&screen_name=" + n + "&count=" + D + R;
				if (F.length > 1) {
					var U = d.retweets == false ? "+exclude:retweets" : "";
					_ = X + "url=search&q=" + encodeURIComponent(F[1]) + "&count=" + D
				}
				break;
			case "google":
				D = D > 100 ? 100 : D;
				M = "https://plus.google.com/" + n;
				_ = "https://www.googleapis.com/plus/v1/people/" + n + "/activities/public";
				O = {
					key: d.api_key,
					maxResults: D,
					prettyprint: false,
					fields: "items(id,kind,object(attachments(displayName,fullImage,id,image,objectType,url),id,objectType,plusoners,replies,resharers,url),published,title,url,verb)"
				};
				break;
			case "youtube":
				var B = n.split("/"),
					F = n.split("#");
				D = D > 50 ? 50 : D;
				M = "https://www.youtube.com/";
				M += F.length > 1 ? "results?search_query=" + encodeURIComponent(F[1]) : "user/" + n;
				M = B.length > 1 ? "https://www.youtube.com/playlist?list=" + B[1] : M;
				_ = "https://gdata.youtube.com/feeds/";
				if (B.length > 1) _ += "api/playlists/" + B[1] + "?v=2&orderby=published";
				else _ += F.length > 1 ? "api/videos?alt=rss&orderby=published&max-results=" + D + "&racy=include&q=" + encodeURIComponent(F[1]) : "base/users/" + n + "/" + x + "?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile";
				_ = frl + encodeURIComponent(_);
				break;
			case "flickr":
				var F = n.split("/"),
					z = F.length > 1 ? "groups_pool" : "photos_public";
				n = F.length > 1 ? F[1] : n;
				M = "https://www.flickr.com/photos/" + n;
				_ = "http://api.flickr.com/services/feeds/" + z + ".gne?id=" + n + "&lang=" + d.lang + "&format=json&jsoncallback=?";
				break;
			case "delicious":
				M = "https://www.delicious.com/" + n;
				_ = "http://feeds.delicious.com/v2/json/" + n;
				break;
			case "pinterest":
				var B = n.split("/");
				_ = "https://www.pinterest.com/" + n + "/";
				_ += B.length > 1 ? "rss" : "feed.rss";
				M = "http://www.pinterest.com/" + n;
				_ = frl + encodeURIComponent(_);
				break;
			case "rss":
				M = n;
				_ = frl + encodeURIComponent(n);
				break;
			case "lastfm":
				M = "https://www.last.fm/user/" + n;
				var W = x == "lovedtracks" ? "2.0" : "1.0";
				_ = frl + encodeURIComponent("https://ws.audioscrobbler.com/" + W + "/user/" + n + "/" + x + ".rss");
				break;
			case "dribbble":
				M = "https://www.dribbble.com/" + n;
				_ = x == "likes" ? "http://api.dribbble.com/players/" + n + "/shots/likes" : "http://api.dribbble.com/players/" + n + "/shots";
				break;
			case "vimeo":
				M = "https://www.vimeo.com/" + n;
				_ = "https://vimeo.com/api/v2/" + n + "/" + x + ".json";
				break;
			case "stumbleupon":
				M = "https://www.stumbleupon.com/stumbler/" + n;
				_ = frl + encodeURIComponent("http://rss.stumbleupon.com/user/" + n + "/" + x);
				break;
			case "deviantart":
				M = "https://" + n + ".deviantart.com";
				_ = frl + encodeURIComponent("https://backend.deviantart.com/rss.xml?type=deviation&q=by%3A" + n + "+sort%3Atime+meta%3Aall");
				break;
			case "tumblr":
				M = "https://" + n + ".tumblr.com";
				_ = "http://" + n + ".tumblr.com/api/read/json?callback=?";
				break;
			case "instagram":
				M = "https://instagram.com/kbeautyofficial";
				_ = "https://api.instagram.com/v1";
				var B = n.substr(0, 1),
					F = n.split(B),
					X = encodeURIComponent(F[1]),
					V = "",
					$ = 0;
				switch (B) {
					case "?":
						var J = F[1].split("/");
						V = "&lat=" + J[0] + "&lng=" + J[1] + "&distance=" + J[2];
						_ += "/media/search";
						break;
					case "#":
						_ += "/tags/" + X + "/media/recent";
						$ = 1;
						break;
					case "!":
						_ += "/users/" + X + "/media/recent";
						break;
					case "@":
						_ += "/locations/" + X + "/media/recent";
						break
				}
				if (d.accessToken == "" && $ == 0)
					if (location.hash) d.accessToken = location.hash.split("=")[1];
					else location.href = "https://instagram.com/oauth/authorize/?client_id=" + d.clientId + "&redirect_uri=" + d.redirectUrl + "&response_type=token";
				_ += "?access_token=" + d.accessToken + "&client_id=" + d.clientId + "&count=" + D + V;
				break
		}
		var K = t == "twitter" ? "json" : "jsonp";
		jQuery.ajax({
			url: _,
			data: O,
			cache: b.cache,
			dataType: K,
			success: function(h) {
				var v = "";
				switch (t) {
					case "facebook":
						if (B.length > 1) h = h.data;
						else if (h.responseStatus == 200) h = h.responseData.feed.entries;
						else v = h.responseDetails;

//console.log(B);
//console.log(h);

						break;
					case "google":
						v = h.error ? h.error : "";
						h = h.items;
						break;
					case "flickr":
						h = h.items;
						break;
					case "instagram":
						h = h.data;
						break;
					case "twitter":
						v = h.errors ? h.errors : "";
						if (F.length > 1) h = h.statuses;
						break;
					case "youtube":
						if (h.responseStatus == 200) {
							h = h.responseData.feed.entries;
							if (B.length > 1) var m = B[0]
						} else v = h.responseDetails;
						break;
					case "dribbble":
						h = h.shots;
						break;
					case "tumblr":
						h = h.posts;
						break;
					case "delicious":
						break;
					case "vimeo":
						break;
					default:
						if (h.responseStatus == 200) h = h.responseData.feed.entries;
						else v = h.responseDetails;
						break
				}
				if (v == "") e.each(h, function(h, v) {
					if (h < D) {
						var y = [],
							N = v.link,
							k = '<a href="' + M + '">' + n + "</a>",
							A = "",
							O = '<a href="' + N + '">' + v.title + "</a>",
							_ = "",
							P = "",
							H = "",
							j = "",
							F = v.publishedDate,
							I = N,
							q = v.title,
							R = "";
						switch (t) {
							case "facebook":
								if (B.length > 1) {
									n = v.from.id;
									var F = new Date;
									F = F.setFbAlbum(v.created_time);
									var U = c(v.link);
//console.log(v.link);
//console.log(U);

									q = B[0] != "" ? B[0] : v.from.name;
									//k = '<a href="http://www.facebook.com/media/set/?set=' + U[1] + '">' + q + "</a>";
									k = '<a href="'+ v.link+'">' + q + "</a>";
									O = "";

                                    var _imgIdx = 2;
                                    while(_imgIdx > v.images.length - 1) {
                                        --_imgIdx;
                                    }
//console.log(_imgIdx);
//console.log( v.images[_imgIdx].source);
									P = '<a href="' + v.images[0].source + '" target="_blank"><img src="' + v.images[0].source + '" alt="" /></a>';
									//P = '<a href="' + v.link + '"><img src="' + v.images[d.image_width].source + '" alt="" /></a>';
									if (d.comments > 0 && v.comments) {
										h = 0;
										j += '<span class="meta"><span class="comments">comments</span></span>';
										e.each(v.comments.data, function(e, t) {
											if (d.comments > e) {
												j += '<span class="meta item-comments"><a href="http://facebook.com/' + t.from.id + '">' + t.from.name + "</a>" + t.message + "</span>";
												e++
											} else return false
										})
									}
									P += j
								} else P = v[d.text];
								break;
							case "twitter":
								F = u(v.created_at);
								var z = v.user.screen_name,
									W = v.user.profile_image_url_https;
								M = "https://www.twitter.com/" + z;
								N = M;
								_ = '<a href="' + N + '" class="thumb"><img src="' + W + '" alt="" /></a>';
								if (d.images != "" && v.entities.media) {
									e.each(v.entities.media, function(e, t) {
										P = '<div class="image"><a href="' + t.media_url_https + '"><img src="' + t.media_url_https + ":" + d.images + '" alt="" /></a></div>'
									});
									P += '<p class="with-image">' + r(v.text) + '</p>';
								} else {
									P += '<p>' + r(v.text) + '</p>';
								}
								I = v.id_str;
								break;
							case "delicious":
								var F = new Date;
								F = F.setRFC3339(v.dt);
								O = '<a href="' + v.u + '">' + v.d + "</a>";
								N = v.u;
								P = v.n;
								I = v.u;
								q = v.d;
								break;
							case "rss":
								P = v[d.text];
								break;
							case "pinterest":
								var X = e("img", v.content).attr("src");
								_ = X ? '<a href="' + N + '"><img src="' + X + '" alt="" /></a>' : "";
								P = v.contentSnippet;
								q = P;
								break;
							case "youtube":
								var V = [];
								V = c(v.link);
								_ = '<a href="' + N + '"><img src="http://img.youtube.com/vi/' + V["v"] + "/" + d.thumb + '.jpg" alt="" /></a>';
								P = v.contentSnippet;
								if (B.length > 1) k = '<a href="' + M + '">' + m + "</a>";
								break;
							case "flickr":
								F = u(v.published);
								O = v.title;
								_ = '<a href="' + N + '" title="' + v.title + '"><img src="' + v.media.m + '" alt="" /></a>';
								break;
							case "lastfm":
								N = v.content;
								break;
							case "dribbble":
								N = v.url;
								F = v.created_at;
								_ = '<a href="' + N + '"><img src="' + v.image_teaser_url + '" alt="' + v.title + '" /></a>';
								P = '<span class="meta"><span class="views">' + l(v.views_count) + '</span><span class="likes">' + l(v.likes_count) + '</span><span class="comments">' + l(v.comments_count) + "</span></span>";
								I = v.url;
								break;
							case "instagram":
								F = parseInt(v.created_time * 1e3, 10);
								O = "";

//console.log(v);
//console.log(d);
								_ = '<a href="' + v.images['standard_resolution'].url + '"><img src="' + v.images[d.thumb].url + '" alt="" /></a>';
								P = v.caption != null ? i(v.caption.text) : "";
								if (v.comments.count > 0 && d.comments > 0) {
									h = 0;
									j += '<span class="meta"><span class="comments">' + l(v.comments.count) + " comments</span></span>";
									e.each(v.comments.data, function(e, t) {
										if (d.comments > e) {
											j += '<span class="meta item-comments"><img src="' + t.from.profile_picture + '" />';
											j += t.from.full_name + " - " + t.text + "</span>";
											e++
										} else return false
									})
								}
								if (v.likes.count > 0 && d.likes > 0) {
									h = 0;
									j += '<span class="meta"><span class="likes">' + l(v.likes.count) + " likes</span></span>";
									j += '<span class="meta item-likes">';
									e.each(v.likes.data, function(e, t) {
										if (d.likes > e) {
											j += '<img src="' + t.profile_picture + '" />';
											e++
										} else return false
									});
									j += "</span>"
								}
								k = '<a href="' + N + '">' + v.user.username + "</a>";
								q = v.caption != null ? v.caption.text : "";
								break;
							case "vimeo":
								f = x, J = v.name, K = v.description, N = v.url;
								if (f == "channels") _ = v.logo != "" ? '<a href="' + N + '" class="logo"><img src="' + v.logo + '" alt="" width="' + L + '" /></a>' : "";
								else if (f == "groups") _ = '<a href="' + N + '"><img src="' + v.thumbnail + '" alt="" /></a>';
								else {
									var $ = "thumbnail_" + d.thumb,
										J = v.title,
										K = f != "albums" ? v.duration + " secs" : v.description;
									_ = '<a href="' + v.url + '"><img src="' + v[$] + '" alt="" /></a>'
								}
								O = '<a href="' + N + '">' + J + "</a>";
								P = K;
								if (d.stats == true) {
									var j = "";
									j += f == "albums" || f == "channels" || f == "groups" ? '<span class="videos">' + l(v.total_videos) + "</span>" : "";
									if (f == "channels") j += '<span class="users">' + l(v.total_subscribers) + "</span>";
									else if (f == "groups") j += '<span class="users">' + l(v.total_members) + "</span>";
									else if (f != "albums") j += '<span class="likes">' + l(v.stats_number_of_likes) + '</span><span class="views">' + l(v.stats_number_of_plays) + '</span><span class="comments">' + l(v.stats_number_of_comments) + "</span>";
									P += '<span class="meta">' + j + "</span>"
								}
								var Q = v.upload_date;
								if (f == "likes") Q = v.liked_on;
								else if (f == "albums" || f == "channels" || f == "groups") Q = v.created_on;
								var F = new Date;
								F = F.setVimeo(Q);
								I = N;
								q = J;
								break;
							case "stumbleupon":
								var X = e("img", v.content).attr("src");
								_ = X != "" && x == "favorites" ? '<a href="' + N + '"><img src="' + X + '" alt="" /></a>' : "";
								P = v.contentSnippet;
								break;
							case "deviantart":
								var X = e("img", v.content).attr("src");
								_ = X ? '<a href="' + N + '"><img src="' + X + '" alt="" /></a>' : "";
								P = v.contentSnippet;
								break;
							case "tumblr":
								N = v["url-with-slug"];
								F = v.date;
								O = '<a href="' + N + '">';
								switch (v.type) {
									case "photo":
										O = v["photo-caption"];
										P = '<a href="' + N + '"><img src="' + v["photo-url-" + d.thumb] + '" alt="" /></a>';
										q = O;
										break;
									case "video":
										O += v["video-caption"];
										P = d.video != "400" ? v["video-player-" + d.video] : v["video-player"];
										q = O;
										break;
									case "regular":
										O += v["regular-title"];
										P = v["regular-body"];
										q = O;
										break;
									case "quote":
										O += v["quote-source"];
										P = v["quote-text"];
										q = O;
										break;
									case "audio":
										O = v["id3-artist"] ? '<a href="' + N + '">' + v["id3-artist"] + " - " + v["id3-album"] + "</a>" : "";
										O += v["id3-title"] ? '<a href="' + N + '" class="track">' + v["id3-title"] + "</a>" : "";
										P = v["audio-caption"];
										P += v["audio-player"];
										q = v["id3-artist"] + " - " + v["id3-album"] + " - " + v["id3-title"];
										break;
									case "conversation":
										O += v["conversation-title"];
										P = v["conversation-text"];
										q = O;
										break;
									case "link":
										var G = v["link-text"].replace(/:/g, "").replace(/\?/g, "").replace(/\!/g, "").replace(/\./g, "");
										O = '<a href="' + v["link-url"] + '">' + G + "</a>";
										P = v["link-description"];
										q = G;
										break
								}
								O += v.type != "photo" || v.type != "audio" ? "</a>" : "";
								q = o(q);
								I = N;
								break;
							case "google":
								var Y = v.object.replies ? l(v.object.replies.totalItems) : 0,
									j = v.object.plusoners ? l(v.object.plusoners.totalItems) : 0,
									Z = v.object.resharers ? l(v.object.resharers.totalItems) : 0,
									et;
								var F = new Date;
								F = F.setRFC3339(v.published);
								et = {
									src: "",
									imgLink: "",
									useLink: "",
									useTitle: ""
								};
								var tt = v.object.attachments;
								if (tt)
									if (tt.length) {
										for (var nt = 0; nt < tt.length; nt++) {
											var rt = tt[nt];
											if (rt.image) {
												et.src = rt.image.url;
												et.imgLink = rt.url;
												if (rt.fullImage) {
													et.w = rt.fullImage.width || 0;
													et.h = rt.fullImage.height || 0
												}
											}
											if (rt.objectType == "article") et.useLink = rt.url;
											if (rt.displayName) et.useTitle = rt.displayName
										}
										if (!et.useLink) et.useLink = et.imgLink;
										var it = d.image_height ? d.image_height : 75;
										var st = d.image_width ? d.image_width : 75;
										if (et.src.indexOf("resize_h") >= 0) et.src = et.w >= et.h ? et.src.replace(/resize_h=\d+/i, "resize_h=" + it) : et.src.replace(/resize_h=\d+/i, "resize_w=" + st)
									}
								et = et;
								N = et.useLink;
								_ = et.src ? (et.useLink ? '<a href="' + et.useLink + '">' : "") + '<img src="' + et.src + '" />' + (et.useLink ? "</a>" : "") : "";
								var ot = L / (et.w / et.h) < L / 3 ? ' class="clear"' : "";
								O = (et.useLink ? '<a href="' + et.useLink + '"' + ot + ">" : "") + (v.title ? v.title : et.useTitle) + (et.useLink ? "</a>" : "");
								if (d.shares) P = '<span class="meta"><span class="plusones">+1s ' + j + '</span><span class="shares">' + Z + '</span><span class="comments">' + Y + "</span></span>";
								I = N;
								q = et.useTitle;
								break
						}
						icon = '<a href="' + M + '"><span class="icon icon-' + d.icon + '"></span></a>';
						if (t == "twitter") {
							var ut = "https://twitter.com/intent/";
							R = '<a href="' + ut + "tweet?in_reply_to=" + I + "&via=" + b.twitterId + '" class="share-reply"></a>';
							R += '<a href="' + ut + "retweet?tweet_id=" + I + "&via=" + b.twitterId + '" class="share-retweet"></a>';
							R += '<a href="' + ut + "favorite?tweet_id=" + I + '" class="share-favorite"></a>'
						} else R = g(q, I, b.twitterId);
						e.each(d.out.split(","), function(n, r) {
							H += r != "intro" ? '<span class="section-' + r + '">' : "";
							switch (r) {
								case "intro":
									if (t == "twitter") zintro = '<div class="section-' + r + '">' + icon + '<div class="twitter-user"><a href="https://www.twitter.com/' + z + '"><strong>' + v.user.name + ' </strong></a></div><a href="https://www.twitter.com/' + z + '" class="twitter-user2">@' + z + '</a> <span class="dot">&#8226;</span> <a href="https://twitter.com/' + z + "/status/" + v.id_str + '" class="post_time">' + a((new Date(F)).getTime(), 0) + "</a></span></div>";
									else if (t == "facebook") zintro = '<div class="section-' + r + '">' + icon + '<a href="' + M + '">/KardashianBeauty</a> <span class="dot">&#8226;</span> <a href="' + N + '" class="post_time">' + a((new Date(F)).getTime(), 0) + "</a></div>";
									else if (t == "instagram") zintro = '<div class="section-' + r + '">' + icon + '<a href="' + M + '">@kbeautyofficial</a> <span class="dot">&#8226;</span> <a href="' + N + '" class="post_time">' + a((new Date(F)).getTime(), 0) + "</a></div>";
									else zintro = '<div class="section-' + r + '">' + icon + '<a href="' + N + '" class="post_time">' + a((new Date(F)).getTime(), 0) + "</a></div>";
									break;
								case "title":
									H += O;
									break;
								case "thumb":
									if (t == "rss") {
										var i = v.content.indexOf("img") >= 0 ? e("img", v.content).attr("src") : "";
										_ = i ? '<a href="' + N + '" class="thumb"><img src="' + i + '" alt="" /></a>' : ""
									}
									H += _;
									break;
								case "text":
									H += P;
									break;
								case "user":
									H += k;
									break;
								case "meta":
									H += j;
									break;
								case "share":
									H += R;
									break
							}
							H += r != "intro" ? "</span>" : ""
						});
						var at = t == "instagram" ? a(F, 1) : a((new Date(F)).getTime(), 1);
						var ft = at;
						switch (b.order) {
							case "random":
								ft = p(6);
								break;
							case "none":
								ft = 1;
								break
						}
						var lt = '<li rel="' + ft + '" class="pksr-li pksr-' + t + " pksr-feed-" + T + '">' + A + '<div class="inner">' + H + '<span class="clear"></span></div>' + zintro + "</li>";
						if (b.max == "days")
							if (at <= E * 86400 && at >= w * 86400) C.push(lt);
							else {
								if (at > E * 86400) return false
							} else C.push(lt)
					}
				});
				else if (b.debug == true) C.push('<li class="pksr-li pksr-error">Error. ' + v + "</li>")
			},
			complete: function() {
				var r = e(C.join(""));
				if (b.wall == true) N.isotope("insert", r);
				else {
					N.append(r);
					h(N, "asc")
				}
				if (t == "facebook" && B.length < 2) v(n, r);
				else if (t == "flickr" && F.length > 1) m(F[1], r)
			}
		});
		return
	}

	function r(e) {
		e = e.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(e) {
			var t = !e.match("^https?://") ? "http://" + e : e;
			return '<a href="' + t + '">' + e + "</a>"
		});
		e = e.replace(/(^|\s)@(\w+)/g, '$1@<a href="http://www.twitter.com/$2">$2</a>');
		e = e.replace(/(^|\s)#(\w+)/g, '$1#<a href="http://twitter.com/search/%23$2">$2</a>');
		return e
	}

	function i(t) {
		return e("<div/>").text(t).html()
	}

	function o(t) {
		var n = e(t);
		return n.text()
	}

	function u(e) {
		var t = e.replace(/(\+\S+) (.*)/, "$2 $1");
		return t
	}

	function a(e, t) {
		var r = Math.round((+(new Date) - e) / 1e3),
			i = "";
		if (t == 1) return r;
		else if (t == 0) {
			var o = new Array;
			o[0] = [60 * 60 * 24 * 365, "year", "years"];
			o[1] = [60 * 60 * 24 * 30, "month", "months"];
			o[2] = [60 * 60 * 24 * 7, "week", "weeks"];
			o[3] = [60 * 60 * 24, "day", "days"];
			o[4] = [60 * 60, "hr", "hrs"];
			o[5] = [60, "min", "mins"];
			var u = 0,
				a = o.length;
			for (u = 0; u < a; u++) {
				s = o[u][0];
				if ((xj = Math.floor(r / s)) != 0) {
					n = xj == 1 ? o[u][1] : o[u][2];
					break
				}
			}
			i += xj == 1 ? "1 " + n : xj + " " + n;
			if (u + 1 < a) {
				s2 = o[u + 1][0];
				if ((xj2 = Math.floor((r - s * xj) / s2)) != 0) {
					n2 = xj2 == 1 ? o[u + 1][1] : o[u + 1][2];
					i += xj2 == 1 ? " + 1 " + n2 : " + " + xj2 + " " + n2
				}
			}
			i += " ago";
			return i
		}
	}

	function l(e) {
		var t = e;
		if (e > 999999) t = Math.floor(e / 1e6) + "M";
		else if (e > 9999) t = Math.floor(e / 1e3) + "K";
		else if (e > 999) t = Math.floor(e / 1e3) + "," + e % 1e3;
		return t
	}

	function c(e) {
		var t = [],
			n, r = e.split("?")[1];
		if (r != undefined) {
			r = r.split("&");
			for (var i = 0; i < r.length; i++) {
				n = r[i].split("=");
				t.push(n[1]);
				t[n[0]] = n[1]
			}
		}
		return t
	}

	function h(t, n) {
		var r = e("li", t);
		r.sort(function(t, r) {
			var i = parseInt(e(t).attr("rel"), 10),
				s = parseInt(e(r).attr("rel"), 10);
			if (n == "asc") return i > s ? 1 : -1;
			else return i < s ? 1 : -1;
			return 0
		});
		e.each(r, function(e, n) {
			t.append(n)
		});
		e(".pksr-loading").slideUp().remove();
		return
	}

	function p(e) {
		var t = 0,
			n = "";
		while (t < e) {
			n += Math.floor(Math.random() * 10 + 1) + "";
			t++
		}
		return n
	}

	function d(t, n, r) {
		var i = e("li:last", t),
			s = e("li:first", t),
			o, u = s.outerHeight(true);
		if (e("li", t).not(".inactive").length > 2)
			if (n == "next") {
				o = i.clone().hide();
				s.before(o);
				i.remove();
				if (i.hasClass("inactive")) d(t, n, r);
				else {
					e(".inner", o).css({
						opacity: 0
					});
					o.slideDown(r, "linear", function() {
						e(".inner", this).animate({
							opacity: 1
						}, r)
					});
					return
				}
			} else {
				o = s.clone();
				if (s.hasClass("inactive")) {
					i.after(o);
					s.remove();
					d(t, n, r)
				} else {
					s.animate({
						marginTop: -u + "px"
					}, r, "linear", function() {
						i.after(o);
						s.remove()
					});
					e(".inner", s).animate({
						opacity: 0
					}, r)
				}
			}
	}

	function v(t, n) {
		jQuery.ajax({
			url: "https://graph.facebook.com/" + t,
			dataType: "jsonp",
			success: function(t) {
				e(".icon", n).each(function() {
					e(this).parent().attr("href", t.link)
				});
				e(".section-user a", n).each(function() {
					e(this).attr("href", t.link);
					e(this).text(t.name)
				})
			}
		})
	}

	function m(t, n) {
		jQuery.ajax({
			url: "http://api.flickr.com/services/feeds/groups_pool.gne?id=" + t + "&format=json&jsoncallback=?",
			dataType: "jsonp",
			success: function(t) {
				e(".icon", n).each(function() {
					e(this).parent().attr("href", t.link)
				})
			}
		})
	}

	function g(e, t, n) {
		var r = "",
			t = encodeURIComponent(t),
			e = encodeURIComponent(e);
		r = '<a href="http://www.facebook.com/sharer.php?u=' + t + "&t=" + e + '" class="share-facebook"></a>';
		r += '<a href="https://twitter.com/share?url=' + t + "&text=" + e + "&via=" + n + '" class="share-twitter"></a>';
		r += '<a href="https://plus.google.com/share?url=' + t + '" class="share-google"></a>';
		r += '<a href="http://www.linkedin.com/shareArticle?mini=true&url=' + t + "&title=" + e + '" class="share-linkedin"></a>';
		return r
	}
	SocialStreamObject = function(e, t) {
		this.create(e, t)
	};
	e.extend(SocialStreamObject.prototype, {
		version: "1.5.2",
		create: function(t, n) {
			this.defaults = {
				feeds: {
					facebook: {
						id: "",
						intro: "Posted",
						out: "intro,thumb,title,text,user,share",
						text: "content",
						comments: 3,
						image_width: 75,
						icon: "facebook"
					},
					twitter: {
						id: "",
						intro: "Tweeted",
						search: "Tweeted",
						out: "intro,thumb,text,share",
						retweets: false,
						replies: false,
						images: "",
						url: "twitter.php",
						icon: "twitter"
					},
					google: {
						id: "",
						intro: "Shared",
						out: "intro,thumb,title,text,share",
						api_key: "",
						image_height: 75,
						image_width: 75,
						shares: true,
						icon: "google.png"
					},
					youtube: {
						id: "",
						intro: "Uploaded,Favorite,New Video",
						search: "Search",
						out: "intro,thumb,title,text,user,share",
						feed: "uploads,favorites,newsubscriptionvideos",
						thumb: "default",
						icon: "youtube.png"
					},
					flickr: {
						id: "",
						intro: "Uploaded",
						out: "intro,thumb,title,text,share",
						lang: "en-us",
						icon: "flickr.png"
					},
					delicious: {
						id: "",
						intro: "Bookmarked",
						out: "intro,thumb,title,text,user,share",
						icon: "delicious.png"
					},
					pinterest: {
						id: "",
						intro: "Pinned",
						out: "intro,thumb,text,user,share",
						icon: "pinterest.png"
					},
					rss: {
						id: "",
						intro: "Posted",
						out: "intro,title,text,share",
						text: "contentSnippet",
						icon: "rss.png"
					},
					lastfm: {
						id: "",
						intro: "Listened to,Loved,Replied",
						out: "intro,thumb,title,text,user,share",
						feed: "recenttracks,lovedtracks,replytracker",
						icon: "lastfm.png"
					},
					dribbble: {
						id: "",
						intro: "Posted,Liked",
						out: "intro,thumb,title,text,user,share",
						feed: "shots,likes",
						icon: "dribbble.png"
					},
					vimeo: {
						id: "",
						intro: "Liked,Video,Appeared In,Video,Album,Channel,Group",
						out: "intro,thumb,title,text,user,share",
						feed: "likes,videos,appears_in,all_videos,albums,channels,groups",
						thumb: "medium",
						stats: true,
						icon: "vimeo.png"
					},
					stumbleupon: {
						id: "",
						intro: "Shared,Reviewed",
						out: "intro,thumb,title,text,user,share",
						feed: "favorites,reviews",
						icon: "stumbleupon.png"
					},
					deviantart: {
						id: "",
						intro: "Deviation",
						out: "intro,thumb,title,text,user,share",
						icon: "deviantart.png"
					},
					tumblr: {
						id: "",
						intro: "Posted",
						out: "intro,title,text,user,share",
						thumb: 100,
						video: 250,
						icon: "tumblr.png"
					},
					instagram: {
						id: "",
						intro: "Posted",
						search: "Search",
						out: "intro,thumb,text,user,share,meta",
						accessToken: "",
						redirectUrl: "",
						clientId: "",
						thumb: "low_resolution",
						comments: 3,
						likes: 8,
						icon: "instagram"
					}
				},
				twitterId: "",
				days: 10,
				limit: 50,
				max: "days",
				external: true,
				speed: 600,
				height: 550,
				wall: false,
				order: "date",
				filter: true,
				controls: true,
				rotate: {
					direction: "up",
					delay: 8e3
				},
				cache: true,
				container: "pksr",
				cstream: "stream",
				content: "pksr-content",
				iconPath: "images/pksr-dark/",
				imagePath: "images/pksr-dark/",
				debug: false
			};
			this.o = {}, this.timer_on = 0, this.id = "pksr-" + e(t).index(), this.timerId = "", this.o = e.extend(true, this.defaults, n), opt = this.o, $load = e('<div class="pksr-loading">creating stream ...</div>');
			e(t).addClass(this.o.container).append('<div class="' + this.o.content + '"><ul class="' + this.o.cstream + '"></ul></div>');
			var r = e("." + this.o.content, t),
				i = e("." + this.o.cstream, t),
				s = e("li", i);
			if (opt.height > 0 && opt.wall == false) r.css({
				height: opt.height + "px"
			});
			if (this.o.filter == true || this.o.controls == true) {
				var o = '<div class="pksr-toolbar">';
				if (this.o.filter == true) {
					o += '<ul id="pksr-filter" class="option-set filter">';
					o += this.o.wall == true ? '<li><a href="#filter" data-group="dc-filter"  data-filter="*" class="selected link-all">all</a></li>' : "";
					var u = e(".filter", t);
					e.each(opt.feeds, function(e, t) {
						o += t.id != "" ? '<li class="active f-' + e + '"><a href="#filter" rel="' + e + '" data-group="dc-filter" data-filter=".pksr-' + e + '"><span class="icon icon-' +opt.feeds[e].icon + '"></span></a></li>' : ""
					});
					o += "</ul>"
				}
				if (this.o.controls == true && opt.wall == false) {
					var a = this.o.rotate.delay <= 0 ? "" : '<li><a href="#" class="play"></a></li>';
					o += '<div class="controls"><ul>' + a + '<li><a href="#" class="prev"></a></li><li><a href="#" class="next"></a></li></ul></div>'
				}
				o += "</div>";
				if (opt.wall == false) e(t).append(o);
				else e(t).before(o)
			}
			if (this.o.wall == true) {
				e(".pksr-toolbar").append($load);
				this.createwall(i)
			} else r.append($load);
			this.createstream(t, i, 0, opt.days);
			this.addevents(t, i);
			if (this.o.rotate.delay > 0) this.rotate(t);
			$load.remove()
		},
		createstream: function(n, r, i, s) {
			e.each(opt.feeds, function(r, o) {
				if (opt.feeds[r].id != "") {
					var u = [];
					e.each(opt.feeds[r].intro.split(","), function(t, n) {
						n = e.trim(n);
						u.push(n)
					});
					e.each(opt.feeds[r].id.split(","), function(o, a) {
						a = e.trim(a);
						if (opt.feeds[r].feed && a.split("#").length < 2)
							if (r == "youtube" && a.split("/").length > 1) t(r, a, opt.iconPath, opt.feeds[r], n, opt, i, s, "posted", "", o);
							else e.each(opt.feeds[r].feed.split(","), function(e, o) {
								t(r, a, opt.iconPath, opt.feeds[r], n, opt, i, s, u[e], o, e)
							});
						else {
							intro = a.split("#").length < 2 ? opt.feeds[r].intro : opt.feeds[r].search;
							t(r, a, opt.iconPath, opt.feeds[r], n, opt, i, s, intro, "", o)
						}
					})
				}
			})
		},
		createwall: function(e) {
			e.imagesLoaded(function() {
				e.isotope({
					itemSelector: "li.pksr-li",
					getSortData: {
						postDate: function(e) {
							return parseInt(e.attr("rel"), 10)
						}
					},
					sortBy: "postDate"
				})
			})
		},
		addevents: function(t, n) {
			var r = this,
				i = this.o.speed;
			var s = e(".stream", t),
				o = {};
			e(".controls", t).delegate("a", "click", function() {
				var s = e(this).attr("class");
				switch (s) {
					case "prev":
						r.pauseTimer();
						d(n, "prev", i);
						break;
					case "next":
						r.pauseTimer();
						d(n, "next", i);
						break;
					case "play":
						r.rotate(t);
						e(".controls .play").removeClass("play").addClass("pause");
						break;
					case "pause":
						r.pauseTimer();
						break
				}
				return false
			});
			e(".filter", t).delegate("a", "click", function() {
				if (opt.wall == false) {
					var t = e(this).attr("rel");
					if (e(this).parent().hasClass("active")) {
						e(".pksr-" + t, n).slideUp().addClass("inactive");
						e(this).parent().animate({
							opacity: .3
						}, 400)
					} else {
						e(".pksr-" + t, n).slideDown().removeClass("inactive");
						e(this).parent().animate({
							opacity: 1
						}, 400)
					}
					e(this).parent().toggleClass("active")
				}
				return false
			});
			if (this.o.external) n.delegate("a", "click", function() {
				if (!e(this).parent().hasClass("section-share")) this.target = "_blank"
			})
		},
		rotate: function(t) {
			var n = this,
				r = e("." + this.o.cstream, t),
				i = this.o.speed,
				s = this.o.rotate.delay,
				o = this.o.rotate.direction == "up" ? "prev" : "next";
			this.timer_on = 1;
			e(".controls .play").removeClass("play").addClass("pause");
			this.timerId = setTimeout(function() {
				d(r, o, i);
				n.rotate(t)
			}, s)
		},
		pauseTimer: function() {
			clearTimeout(this.timerId);
			this.timer_on = 0;
			e(".controls .pause").removeClass("pause").addClass("play")
		}
	});
	e.fn.dcSocialStream = function(t, n) {
		var r = {};
		this.each(function() {
			var i = e(this);
			r = i.data("socialtabs");
			if (!r) {
				r = new SocialStreamObject(this, t, n);
				i.data("socialtabs", r)
			}
		});
		return r
	};
	Date.prototype.setRFC3339 = function(e) {
		var t, n;
		var r = 1;
		var i = e.split("T");
		var s = i[0].split("-");
		var o = i[1].split(":");
		var u = o[o.length - 1];
		var a;
		offsetFieldIdentifier = u.charAt(u.length - 1);
		if (offsetFieldIdentifier == "Z") {
			t = 0;
			o[o.length - 1] = u.substr(0, u.length - 2)
		} else {
			if (u[u.length - 1].indexOf("+") != -1) {
				n = "+";
				r = 1
			} else {
				n = "-";
				r = -1
			}
			a = u.split(n);
			o[o.length - 1] == a[0];
			a = a[1].split(":");
			t = a[0] * 60 + a[1];
			t = t * 60 * 1e3
		}
		this.setTime(Date.UTC(s[0], s[1] - 1, s[2], o[0], o[1], o[2]) + t * r);
		return this
	};
	Date.prototype.setFbAlbum = function(e) {
		var t, n = "+",
			r = 1,
			i = e.split("T"),
			s = i[0].split("-"),
			o = i[1].split(":"),
			u = o[o.length - 1],
			a;
		if (u[u.length - 1].indexOf("+") != -1) {
			n = "-";
			r = -1
		}
		offsetTime = u.split(n);
		t = parseInt(offsetTime[1] / 100, 10) * 60 * 1e3;
		this.setTime(Date.UTC(s[0], s[1] - 1, s[2], o[0], o[1], offsetTime[0]) + t * r);
		return this
	};
	Date.prototype.setVimeo = function(e) {
		var t = 0,
			n, r = 1;
		var i = e.split(" ");
		var s = i[0].split("-");
		var o = i[1].split(":");
		this.setTime(Date.UTC(s[0], s[1] - 1, s[2], o[0], o[1], o[2]) + t * r);
		return this
	}
})(jQuery);
jQuery(window).load(function() {
	jQuery.getScript("//platform.twitter.com/widgets.js", function() {});
	jQuery(".section-share a").click(function() {
		var e = jQuery(this).attr("href");
		window.open(e, "sharer", "toolbar=0,status=0,width=626,height=436");
		return false
	});
	jQuery(".pksr-facebook .section-text a").each(function(e) {
		var t = jQuery(this).attr("href");
		var n = decodeURIComponent(t.replace("http://www.facebook.com/l.php?u=", "")).split("&");
		jQuery(this).attr("href", n[0])
	});

    //jQuery("li.pksr-li .inner a").click(function(e) {
    //    e.stopPropagation();
    //    e.preventDefault();
    //    console.log(e);
    //    console.log(e.currentTarget);
    //    alert(e.currentTarget.href);
    //});

});