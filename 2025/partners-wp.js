---
---
(function (d, partners) {
    var f = function (p, data) {
        var tags, name;

        if (!p) {
            return;
        }

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
            hi.setAttribute('loading', 'lazy');
            hi.setAttribute('fetchpriority', 'low');
            hi.setAttribute('decoding', 'async');
            hi.setAttribute('width', '600');
            hi.setAttribute('height', '176');

            hp = d.createElement('PICTURE');
            hp.appendChild(hi);

            ha = d.createElement('A');
            ha.setAttribute('href', v.url.replace(/%name%/g, encodeURIComponent(name)));
            ha.setAttribute('target', '_blank');
            ha.setAttribute('aria-label', v.name);
            ha.className = 'card-link';

            hd = d.createElement('DIV');
            hd.className = 'logo';
            hd.appendChild(hp);
            hd.appendChild(ha);

            har = d.createElement('ARTICLE')
            har.className = 'inner card sponsor';
            har.appendChild(hd);

            hl = d.createElement('LI');
            hl.className = 'flex-hold-child default-color-combo';
            hl.appendChild(har);

            p.appendChild(hl);
        });
    };

    f(d.querySelector('ul.media-partner'), partners.media, false);
    f(d.querySelector('ul.community-partner'), partners.community, true);
})(document, {
    'media': {{ site.data.partners_2025.media | sort_natural: 'name' | jsonify }},
    'community': {{ site.data.partners_2025.community | sort_natural: 'name' | jsonify }}
});
