Server = {
  options: {
    pow: './pow/0.3.2',
    port: '20560',
    domains: 'dev'
  },

  optionPattern: /^--([a-z]+)=(.*)/,

  usage: function(code, message) {
    var key;
    message ? process.stdout.write(message + '\n') : void(0);
    process.stdout.write('node server.js');
    for (key in Server.options) {
      process.stdout.write(' [--' + key + '=' + Server.options[key] + ']');
    }
    process.stdout.write('\n')
    code ? process.exit(code) : void(0);
  },

  parseOptions: function() {
    var matches, key, value;
    process.argv.slice(2).forEach(function (val) {
      if (val == '-h' || val == '--help') {
        Server.usage(0);
      }

      matches = val.match(Server.optionPattern);
      if (matches === null) {
        Server.usage(1, 'invalid option: ' + val);
      }

      key = matches[1];
      value = matches[2];
      if (key in Server.options) {
        Server.options[key] = value;
      } else {
        Server.usage(2, 'unknown key: ' + key);
      }
    });
  },

  domainsPattern: function() {
    return RegExp('(^|\\.)(' + Server.options.domains.replace(/,/g, '|').replace(/\./g, '\\.') + ')\\.?$', 'i');
  },

  startServer: function() {
    var klass = require(Server.options.pow + '/lib/dns_server.js');
    var server = new klass({
      dnsDomainPattern: Server.domainsPattern()
    });
    server.listen(parseInt(Server.options.port));
  },

  resolver: function() {
    return 'namespace: 127.0.0.1\nport: ' + Server.options.port + '\n';
  }
}

Server.parseOptions();

process.stdout.write('Save following content as files: ' + Server.options.domains.split(',').map(function(val) {
  return '/etc/resolver/' + val;
}).join(', '));
process.stdout.write('\n\n# File generated by simpledns/server.js\n');
process.stdout.write(Server.resolver());
process.stdout.write('# File content ends here\n\n');

Server.startServer();
