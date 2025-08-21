# AWS 설정 파일 상세 설명

이 문서는 watcha-clone 프로젝트의 AWS 배포에 사용되는 설정 파일들의 역할과 각 항목의 의미를 자세히 설명합니다.

## 📋 목차

1. [CloudFront Distribution 설정](#cloudfront-distribution-설정)
2. [S3 버킷 정책 파일들](#s3-버킷-정책-파일들)
3. [각 설정의 실제 효과](#각-설정의-실제-효과)
4. [보안 고려사항](#보안-고려사항)

---

## CloudFront Distribution 설정

### 📄 `distribution-config.json`

CloudFront Distribution의 전체 설정을 담고 있는 파일입니다. AWS 콘솔에서 `aws cloudfront get-distribution` 명령어로 생성됩니다.

#### 🔧 주요 설정 항목 설명

```json
{
  "ETag": "E2CLCXVY2ZQ32J",  // 설정 버전 식별자 (변경 시 자동 업데이트)
  "DistributionConfig": {
    
    // === 기본 정보 ===
    "CallerReference": "dddbb602-ef6e-4eb7-b97e-e6b260d50a5b",  // 유니크 ID (생성 시 자동 생성)
    "Aliases": {          // 커스텀 도메인 설정 (예: www.example.com)
      "Quantity": 0       // 현재 커스텀 도메인 없음
    },
    "DefaultRootObject": "",  // 루트 경로(/) 접속 시 기본 파일 (보통 index.html)
    
    // === Origin 설정 (콘텐츠 원본 서버) ===
    "Origins": {
      "Quantity": 1,  // Origin 개수
      "Items": [
        {
          "Id": "watch-cloning.s3.ap-northeast-2.amazonaws.com-mei7vvcf1ov",  // Origin 식별자
          "DomainName": "watch-cloning.s3.ap-northeast-2.amazonaws.com",     // 원본 서버 주소
          "OriginPath": "",  // Origin 내 특정 경로 (비어있으면 루트)
          
          // S3 Origin 전용 설정
          "S3OriginConfig": {
            "OriginAccessIdentity": "",    // 구형 OAI (현재 미사용)
            "OriginReadTimeout": 30        // Origin 응답 대기 시간 (초)
          },
          
          // 연결 설정
          "ConnectionAttempts": 3,   // 연결 시도 횟수
          "ConnectionTimeout": 10,   // 연결 타임아웃 (초)
          
          // Origin Shield (추가 캐싱 레이어)
          "OriginShield": {
            "Enabled": false  // 비활성화 (비용 절약)
          },
          
          "OriginAccessControlId": "E2GZLU1EFSAES4"  // 신형 OAC ID
        }
      ]
    },
    
    // === 캐시 동작 설정 ===
    "DefaultCacheBehavior": {
      "TargetOriginId": "watch-cloning.s3.ap-northeast-2.amazonaws.com-mei7vvcf1ov",  // 사용할 Origin
      
      // 프로토콜 정책
      "ViewerProtocolPolicy": "redirect-to-https",  // HTTP → HTTPS 자동 리다이렉트
      
      // 허용 HTTP 메서드
      "AllowedMethods": {
        "Quantity": 2,
        "Items": ["HEAD", "GET"],  // 읽기 전용 (정적 웹사이트용)
        "CachedMethods": {         // 캐시할 메서드
          "Quantity": 2,
          "Items": ["HEAD", "GET"]
        }
      },
      
      "Compress": true,  // 자동 압축 (Gzip) - 전송 속도 향상
      
      // 캐시 정책 (AWS 관리형)
      "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",  // Managed-CachingOptimized
      
      // 신뢰할 수 있는 서명자 (고급 보안 기능)
      "TrustedSigners": {
        "Enabled": false,  // 비활성화
        "Quantity": 0
      }
    },
    
    // === 에러 페이지 설정 ===
    "CustomErrorResponses": {
      "Quantity": 0  // SPA 라우팅용 에러 페이지 미설정 (추후 필요시 추가)
    },
    
    // === 로깅 설정 ===
    "Logging": {
      "Enabled": false,      // 액세스 로그 비활성화
      "IncludeCookies": false,
      "Bucket": "",          // 로그 저장할 S3 버킷 (미설정)
      "Prefix": ""           // 로그 파일 프리픽스
    },
    
    // === 요금 클래스 ===
    "PriceClass": "PriceClass_All",  // 전 세계 모든 엣지 로케이션 사용
    // 옵션: PriceClass_100 (저렴), PriceClass_200 (중간), PriceClass_All (전체)
    
    "Enabled": true,  // Distribution 활성화 상태
    
    // === SSL 인증서 설정 ===
    "ViewerCertificate": {
      "CloudFrontDefaultCertificate": true,  // CloudFront 기본 인증서 사용
      "SSLSupportMethod": "vip",             // SSL 지원 방식
      "MinimumProtocolVersion": "TLSv1",     // 최소 TLS 버전
      "CertificateSource": "cloudfront"      // 인증서 소스
    },
    
    // === 지역 제한 ===
    "Restrictions": {
      "GeoRestriction": {
        "RestrictionType": "none",  // 지역 제한 없음
        "Quantity": 0
      }
    },
    
    // === 기타 설정 ===
    "WebACLId": "",           // Web Application Firewall (WAF) 미사용
    "HttpVersion": "http2",   // HTTP/2 지원 (성능 향상)
    "IsIPV6Enabled": true,    // IPv6 지원
    "Staging": false          // 스테이징 환경 아님
  }
}
```

#### 💡 주요 설정 의미

1. **Origin 설정**: S3 REST API 엔드포인트 사용 → OAC로 보안 강화
2. **캐시 정책**: AWS 관리형 최적화 정책 → 자동 최적화
3. **HTTPS 리다이렉트**: 모든 HTTP 요청을 HTTPS로 → 보안 강화
4. **전 세계 배포**: PriceClass_All → 최고 성능, 약간 높은 비용

---

## S3 버킷 정책 파일들

### 📄 `s3-cloudfront-policy.json` (CloudFront 전용 정책)

CloudFront에서만 S3 버킷에 접근할 수 있도록 하는 보안 강화 정책입니다.

```json
{
  "Version": "2012-10-17",  // AWS IAM 정책 버전 (표준)
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",  // Statement 고유 식별자
      "Effect": "Allow",  // 허용 정책
      
      // === 누가 접근할 수 있는가? ===
      "Principal": {
        "Service": "cloudfront.amazonaws.com"  // CloudFront 서비스만 허용
      },
      
      // === 무엇을 할 수 있는가? ===
      "Action": "s3:GetObject",  // 파일 읽기만 허용 (업로드/삭제 불가)
      
      // === 어디에 접근할 수 있는가? ===
      "Resource": "arn:aws:s3:::watch-cloning/*",  // 버킷 내 모든 파일
      
      // === 추가 조건 ===
      "Condition": {
        "StringEquals": {
          // 특정 CloudFront Distribution에서만 접근 가능
          "AWS:SourceArn": "arn:aws:cloudfront::157683378796:distribution/E35CS1HDQD03BQ"
        }
      }
    }
  ]
}
```

#### 🔒 보안 특징
- **S3 직접 접근 차단**: CloudFront를 거치지 않은 접근 불가
- **Distribution 제한**: 지정된 CloudFront Distribution만 접근 가능
- **읽기 전용**: 파일 다운로드만 허용, 업로드/삭제 불가

### 📄 `s3-public-policy.json` (퍼블릭 접근 정책)

모든 사용자가 S3 버킷의 파일을 읽을 수 있도록 하는 정책입니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",  // Statement 식별자
      "Effect": "Allow",
      
      // === 누가 접근할 수 있는가? ===
      "Principal": "*",  // 모든 사용자 (인터넷의 누구나)
      
      // === 무엇을 할 수 있는가? ===
      "Action": "s3:GetObject",  // 파일 읽기만 허용
      
      // === 어디에 접근할 수 있는가? ===
      "Resource": "arn:aws:s3:::watch-cloning/*"  // 버킷 내 모든 파일
    }
  ]
}
```

#### 🌐 사용 시나리오
- **S3 웹사이트 엔드포인트**: `http://watch-cloning.s3-website.ap-northeast-2.amazonaws.com/`
- **SPA 라우팅 지원**: 404 오류 시 index.html로 리다이렉트
- **CloudFront Origin**: 웹사이트 엔드포인트는 퍼블릭 정책 필요

### 📄 `s3-website-policy.json` (혼합 정책 - 사용하지 않음)

퍼블릭 접근과 CloudFront 접근을 모두 허용하는 정책입니다. 현재는 사용하지 않습니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",     // 퍼블릭 접근
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::watch-cloning/*"
    },
    {
      "Sid": "AllowCloudFrontServicePrincipal",  // CloudFront 접근
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::watch-cloning/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::157683378796:distribution/E35CS1HDQD03BQ"
        }
      }
    }
  ]
}
```

#### ⚠️ 문제점
- **중복 SID**: AWS에서 같은 Statement ID 허용하지 않음
- **불필요한 복잡성**: 한 가지 접근 방식만 사용하는 것이 좋음

---

## 각 설정의 실제 효과

### 🏗️ 아키텍처별 차이점

#### 1. CloudFront + S3 REST API + OAC (보안 우선)
```
사용자 → CloudFront → S3 REST API (OAC 인증)
```
- **정책**: `s3-cloudfront-policy.json`
- **보안**: 최고 (S3 직접 접근 불가)
- **기능**: 기본 파일 서빙
- **제한**: SPA 라우팅 지원 어려움

#### 2. CloudFront + S3 웹사이트 엔드포인트 (현재 사용)
```
사용자 → CloudFront → S3 웹사이트 엔드포인트 (퍼블릭)
```
- **정책**: `s3-public-policy.json`
- **보안**: 중간 (CloudFront를 통한 접근 권장)
- **기능**: SPA 라우팅 완벽 지원
- **특징**: 404 → index.html 리다이렉트

### 📊 설정 비교표

| 설정 항목 | CloudFront+OAC | CloudFront+웹사이트 |
|-----------|----------------|-------------------|
| **보안** | 높음 (S3 직접 접근 불가) | 중간 (S3 직접 접근 가능) |
| **SPA 지원** | 제한적 | 완벽 |
| **설정 복잡도** | 높음 | 낮음 |
| **사용 정책** | s3-cloudfront-policy.json | s3-public-policy.json |
| **Origin 타입** | REST API | 웹사이트 엔드포인트 |

### 🎯 현재 프로젝트 설정

**watcha-clone 프로젝트는 React SPA이므로:**
- **채택**: CloudFront + S3 웹사이트 엔드포인트
- **이유**: React Router 클라이언트 사이드 라우팅 지원 필요
- **정책**: `s3-public-policy.json` 사용

---

## 보안 고려사항

### 🔐 민감 정보 포함 항목

#### ARN (Amazon Resource Name)
```json
"AWS:SourceArn": "arn:aws:cloudfront::157683378796:distribution/E35CS1HDQD03BQ"
```
- **포함 정보**: AWS 계정 ID (157683378796), Distribution ID
- **위험도**: 중간 (직접적 피해는 없으나 계정 정보 노출)

#### Distribution ID
```json
"DistributionConfig": {
  // Distribution ID: E35CS1HDQD03BQ
}
```
- **포함 정보**: CloudFront Distribution 식별자
- **위험도**: 낮음 (퍼블릭 정보이지만 노출 비권장)

#### 계정별 고유 설정
```json
"CallerReference": "dddbb602-ef6e-4eb7-b97e-e6b260d50a5b"
"OriginAccessControlId": "E2GZLU1EFSAES4"
```
- **포함 정보**: 계정별 고유 식별자
- **위험도**: 중간 (계정 구조 파악 가능)

### 🛡️ 보안 모범 사례

1. **gitignore 필수**: 모든 AWS 설정 파일
2. **환경변수 사용**: 민감 정보는 환경변수로 관리
3. **최소 권한 원칙**: 필요한 권한만 부여
4. **정기적 검토**: 액세스 로그 및 권한 점검

### 📝 안전한 공유 방법

```bash
# 템플릿 파일 생성 (실제 값 제거)
cp s3-public-policy.json s3-public-policy.template.json

# 민감 정보 플레이스홀더로 교체
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

---

## 실습 가이드

### 🚀 정책 적용 명령어

```bash
# 1. 퍼블릭 정책 적용 (현재 사용)
aws s3api put-bucket-policy --bucket watch-cloning --policy file://s3-public-policy.json

# 2. CloudFront 전용 정책 적용 (보안 강화 시)
aws s3api put-bucket-policy --bucket watch-cloning --policy file://s3-cloudfront-policy.json

# 3. 현재 적용된 정책 확인
aws s3api get-bucket-policy --bucket watch-cloning

# 4. CloudFront 설정 확인
aws cloudfront get-distribution --id E35CS1HDQD03BQ
```

### 🔧 정책 변경 시나리오

**시나리오 1: 보안 강화**
1. CloudFront Origin을 웹사이트 → REST API로 변경
2. `s3-cloudfront-policy.json` 적용
3. 퍼블릭 액세스 차단

**시나리오 2: 기능 우선 (현재)**
1. CloudFront Origin을 REST API → 웹사이트로 변경
2. `s3-public-policy.json` 적용
3. SPA 라우팅 지원

---

이 문서를 통해 AWS 설정 파일들의 역할과 보안 고려사항을 완전히 이해할 수 있습니다. 각 설정의 의미를 파악하여 프로젝트 요구사항에 맞는 최적의 구성을 선택하세요.