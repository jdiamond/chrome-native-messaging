#!/bin/bash

cd $(dirname $0)

mkdir -p /Library/Google/Chrome/NativeMessagingHosts
cp com.my_company.my_application.json /Library/Google/Chrome/NativeMessagingHosts
