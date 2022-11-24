---
---
(function (d, partners) {
    var f = function (p, data) {
        var tags, name;

        if (!p.length) {
            return;
        }

        p = p[0];
        tags = p.getAttribute('data-tags') ? p.getAttribute('data-tags').split(/ +/) : '';
        name = p.getAttribute('data-name') ? p.getAttribute('data-name') : '';

        data.forEach(function(v) {
            var hd, ha, hi;

            if (v.tags) {
                var c = v.tags.filter(function(n) {
                    return n === name || tags.indexOf(n) !== -1;
                });

                if (!c.length) {
                    return;
                }
            }

            hi = d.createElement('IMG');
            hi.setAttribute('src', {{ site.helper_baseurl | jsonify }} + '/img/partners/' + v.img);
            hi.setAttribute('alt', v.name);

            ha = d.createElement('A');
            ha.setAttribute('href', v.url.replace(/%name%/g, encodeURIComponent(name)));
            ha.setAttribute('target', '_blank');
            ha.setAttribute('aria-title', v.name);
            ha.setAttribute('role', 'button');
            ha.setAttribute('rel', 'noopener noreferrer external');
            ha.appendChild(hi);

            hd = d.createElement('DIV');

            if (p.classList.contains('grusp_community_partners')) {
                hd.setAttribute('class', 'column column__community');
            } else {
                hd.setAttribute('class', 'column column__media');
            }

            hd.appendChild(ha);

            p.appendChild(hd);
        });
    };

    f(d.getElementsByClassName('grusp_media_partners'), partners.media, false);
    f(d.getElementsByClassName('grusp_community_partners'), partners.community, true);
})(document, {
    'media': {{ site.data.partners_2023.media | sort_natural: 'name' | jsonify }},
    'community': {{ site.data.partners_2023.community | sort_natural: 'name' | jsonify }}
});
