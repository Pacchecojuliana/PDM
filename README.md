# 📡 Script de Configuração Automática de Bonding com LACP via Netplan

Este script automatiza a criação e aplicação de uma configuração de rede com agregação de links (bonding) usando o protocolo **LACP (802.3ad)** no **Ubuntu Server 22.04**, utilizando o **Netplan com o renderer `networkd`**.

---

##  Requisitos

- Ubuntu Server 22.04 LTS
- Netplan instalado e utilizando `networkd` como renderer
- Acesso root ou permissão para executar comandos com `sudo`
- Interfaces de rede já conectadas e disponíveis

---

##  Instalação

1. Clone ou copie o script para sua máquina:

```bash
wget https://exemplo.com/script_bonding.py -O script_bonding.py

chmod +x script_bonding.py
```

> Altere o link conforme a localização real do seu script.

2. **(Opcional)** Faça backup do arquivo atual de configuração do Netplan:

```bash
sudo cp /etc/netplan/01-netcfg.yaml /etc/netplan/01-netcfg.yaml.bkp
```

---

##  Como Executar

Execute o script passando os parâmetros na seguinte ordem:

```bash
sudo python3 script_bonding.py <bond_name1> <bond_name2> <interface1_1> <interface1_2> <interface2_1> <interface2_2> <ip1> <ip2> <dns_ip>
```

###  Parâmetros:

| Parâmetro       | Descrição                                           | Exemplo               |
|----------------|-----------------------------------------------------|------------------------|
| `<bond_name1>` | Nome do primeiro bond (ex: `bond0`)                | bond0                 |
| `<bond_name2>` | Nome do segundo bond (ex: `bond1`)                 | bond1                 |
| `<interface1_1>` | Primeira interface do bond0                        | eno1                  |
| `<interface1_2>` | Segunda interface do bond0                         | eno2                  |
| `<interface2_1>` | Primeira interface do bond1                        | ens1                  |
| `<interface2_2>` | Segunda interface do bond1                         | ens2                  |
| `<ip1>`         | Endereço IP com máscara do bond0                   | 192.168.10.10/24      |
| `<ip2>`         | Endereço IP com máscara do bond1                   | 192.168.20.10/24      |
| `<dns_ip>`      | IP do servidor DNS                                 | 8.8.8.8               |

---

##  O que o script faz

1. Gera e escreve o arquivo `/etc/netplan/01-netcfg.yaml` com os parâmetros informados.
2. Valida a configuração com `netplan try`.
3. Aplica a configuração com `netplan apply`.
4. Exibe o status dos bonds criados.
5. Mostra os IPs das interfaces e as rotas configuradas.
6. Testa a conectividade com o DNS e o domínio `google.com`.

---

##  Exemplo de uso

```bash
sudo python3 script_bonding.py bond0 bond1 eno1 eno2 ens1 ens2 192.168.10.10/24 192.168.20.10/24 8.8.8.8
```

---

##  Dicas

- Use `ip a` antes de rodar o script para conferir os nomes corretos das interfaces.
- Após executar, verifique o status do bonding com:

```bash
cat /proc/net/bonding/bond0
cat /proc/net/bonding/bond1
```

---

##   Aviso

Este script **sobrescreve o arquivo `/etc/netplan/01-netcfg.yaml`**, portanto **faça backup** se houver configurações anteriores importantes.

---

## 
Projeto de automação de configuração de rede — GigaNuvem
