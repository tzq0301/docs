# mihomo

* [Mihomo Wiki](https://wiki.metacubex.one/)
* [GitHub Repository](https://github.com/MetaCubeX/mihomo)

```bash
MIHOMO_DIR=/opt/mihomo

sudo mkdir -p "$MIHOMO_DIR"

cd "$MIHOMO_DIR"

URL=https://github.com/MetaCubeX/mihomo/releases/download/v1.18.6/mihomo-linux-arm64-v1.18.6.gz

wget "$URL"

sudo gzip -f "$(basename -s .gz "$URL")" -d

sudo mv "$(basename -s .gz "$URL")" mihomo

sudo chmod +x mihomo

CONFIG_URL=

wget "$CONFIG_URL"

COUNTRY_MMDB_URL=https://github.com/Dreamacro/maxmind-geoip/releases/download/20240712/Country.mmdb

wget "$COUNTRY_MMDB_URL"

sudo tee /etc/systemd/system/mihomo.service <<EOF
[Unit]
Description=mihomo Daemon, Another Clash Kernel.
After=network.target NetworkManager.service systemd-networkd.service iwd.service

[Service]
Type=simple
LimitNPROC=500
LimitNOFILE=1000000
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE CAP_SYS_TIME CAP_SYS_PTRACE CAP_DAC_READ_SEARCH CAP_DAC_OVERRIDE
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE CAP_SYS_TIME CAP_SYS_PTRACE CAP_DAC_READ_SEARCH CAP_DAC_OVERRIDE
Restart=always
ExecStartPre=/usr/bin/sleep 1s
ExecStart=$MIHOMO_DIR/mihomo -d $MIHOMO_DIR
ExecReload=/bin/kill -HUP \$MAINPID

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload

sudo systemctl enable mihomo

sudo systemctl start mihomo

sudo systemctl status mihomo

tee -a "$HOME/.profile" <<EOF
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
EOF

source "$HOME/.profile"
```
