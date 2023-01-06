package common.util;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.Assert;

/**
 * 파일 처리 관련된 유틸리티 API.
 *
 * @author Administrator
 *
 */
public class FileUtil {

    /**
     * Logging output for this class.
     */
    protected static final Log log = LogFactory.getLog(FileUtil.class);

    public static final int BUFFER_SIZE = 4096;

    /**
	 * path 파라미터의 파일이나 디렉터리가 없으면, 해당 디렉터리를 생성한다.
	 * 만일 파일이나 디렉터리가 존재한다면 false를 반환한다.
	 *
	 * @param path
	 *         	생성할 디렉터리 위치
	 * @return boolean
	 * 			<code>true</code> 성공적으로 디렉터리를 생성한 경우.
	 *         	<code>false</code> 디렉터리를 생성하지 않은 경우.
	 */
    public static boolean makeDirectories(String path) {
        if( StringUtils.isBlank(path)) {
        	throw new RuntimeException("Given path parameter is blank. Thus can't make directory.");
        }

        File f = new File(path);

        if (f.exists()) {
        	return false;
        } else {
        	if (log.isDebugEnabled()) {
        		log.debug(" Path does not exist on the file system. Creating folders...");
        	}
        	f.mkdirs();
        	return true;
        }
    }

    /**
	 * 파일시스템에서 지정된 디렉터리를 삭제한다.
	 *
	 * @param path
	 *            삭제한 디렉터리
	 * @todo implement flag
	 */
    public static void removeDirectories(String path, boolean removeWithContents) {
        if (log.isDebugEnabled()) {
            log.debug(" Attempting to remove folders for path: " + path);
        }
        if (StringUtils.isBlank(path)) {
        	throw new RuntimeException("Given path is blank.");
        }

        File f = new File(path);

    	try {
			FileUtils.deleteDirectory(f);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
    }

	/**
	 * 지정된 파일의 위치를 옮긴다.
	 *
	 * @param fromFile 원본 위치
	 * @param toFile 대상 위치
	 * @throws IOException
	 *
	 */
    public static void moveFile(String fromFile, String toFile) {
        try {
        	if( StringUtils.isNotBlank(toFile)){
        		String replacedPath = replacePathToSlash(toFile);
        		makeDirectories(replacedPath.substring(0, replacedPath.lastIndexOf("/")));
        	} else {
        		throw new RuntimeException("Given target file path is blank. Thus can't move source file.");
        	}

        	copyFile(fromFile, toFile);
			deleteFile(fromFile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    /**
     * 파일을 복사한다. 대상 파일이 이미 존재하는 경우, 런타임 예외를 발생시킨다.
     *
     * @param fromFile 원본 파일
     * @param toFile 대상 파일
     * @throws IOException
     */
    public static void copyFile(String fromFile, String toFile) throws IOException {
    	FileInputStream fis 	= null;
    	FileOutputStream fos 	= null;

        try {
        	if(new File(toFile).exists()){ // 대상 파일이 이미 존재하면 예외 처리
        		throw new RuntimeException("Given target file exist already. : " + toFile);
        	}

        	//retrieve the file data
        	fis = new FileInputStream(fromFile);
        	fos = new FileOutputStream(toFile);

            byte[] buffer = new byte[BUFFER_SIZE];
            int bytesRead = 0;

            while ((bytesRead = fis.read(buffer, 0, BUFFER_SIZE)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
        } catch (FileNotFoundException fnfe) {
            throw new RuntimeException(fnfe);
        } catch (Exception ioe) {
        	throw new RuntimeException(ioe);
        } finally {
	        fis.close();
	        fos.close();
        }
    }

    /**
     * 파일을 복사한다.
     *
     * @param in byte[] 복사할 원본의 바이너리
     * @param outPathName String 목표 파일명
     * @throws IOException
     */
	public static void copyFile(byte[] in, String outPathName) throws IOException {
		Assert.notNull(in, "No input byte array specified");
		File out = new File(outPathName);
		if( out.exists() ){
			throw new RuntimeException("Given target file exist already. : " + outPathName);
		}
		copyFile(in, out);
	}

	/**
	 * 파일을 복사한다.
	 *
	 * @param in byte[]
	 * @param out File
	 * @throws IOException
	 */
	public static void copyFile(byte[] in, File out) throws IOException {
		Assert.notNull(in, "No input byte array specified");
		Assert.notNull(out, "No output File specified");
		ByteArrayInputStream inStream = new ByteArrayInputStream(in);

		String replacedPath = replacePathToSlash(out.getPath());
		makeDirectories(replacedPath.substring(0, replacedPath.lastIndexOf("/")));

		OutputStream outStream = new BufferedOutputStream(new FileOutputStream(out));
		copyFile(inStream, outStream);
	}

	/**
	 * 파일을 복사한다.
	 *
	 * @param in InputStream
	 * @param out OutputStream
	 * @return
	 * @throws IOException
	 */
	public static int copyFile(InputStream in, OutputStream out) throws IOException {
		Assert.notNull(in, "No InputStream specified");
		Assert.notNull(out, "No OutputStream specified");
		try {
			int byteCount = 0;
			byte[] buffer = new byte[BUFFER_SIZE];
			int bytesRead = -1;
			while ((bytesRead = in.read(buffer)) != -1) {
				out.write(buffer, 0, bytesRead);
				byteCount += bytesRead;
			}
			out.flush();
			return byteCount;
		}
		finally {
			try {
				in.close();
			}
			catch (IOException ex) {
				log.warn("Could not close InputStream", ex);
			}
			try {
				out.close();
			}
			catch (IOException ex) {
				log.warn("Could not close OutputStream", ex);
			}
		}
	}

	/**
	 * 지정된 위치의 파일을 byte[]로 반환한다.
	 *
	 * @param fullFilePath
	 * @return
	 * @throws IOException
	 */
	public static byte[] getFileToByteArray(String fullFilePath) throws IOException {
		Assert.notNull(fullFilePath, "No input byte array specified");

		FileInputStream fis = null;
		byte[] out = null;
		try {
			fis = new FileInputStream(fullFilePath);
			out = new byte[fis.available()];

			fis.read(out);
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			fis.close();
		}
		return out;
	}

	/**
	 * 지정된 파일을 삭제한다.
	 *
	 * @param fullFilePath 파일 위치 문자열
	 */
    public static void deleteFile(String fullFilePath) {
        File file = new File(fullFilePath);

        try {
            if (file.exists()) {
                file.delete();
            }
            else{
            	log.debug("Given path's file do not exist. : " + fullFilePath);
            }
        } catch (SecurityException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 파일이나 디렉터리 명을 "/"(슬래시)기반으로 변경하여 반환.
     *
     * @param path 변경할 패스 문자열
     * @return
     */
    public static String replacePathToSlash(String path){
    	return (StringUtils.isBlank(path)) ?
    			path :
    			path.replaceAll("[\\\\]+", "/").replaceAll("[/]{2,}", "/");
    }

    /**
     * Zip 압축파일 풀기
     * [JAVA UTIL ZIP로   압축풀기용]
     * ntarget - 2011-03-04
     * @param string
     * @param dmMonthPath
     */
	@SuppressWarnings("rawtypes")
	public static void unzipFile(String fromFile, String toPath) {

		//디렉토리 생성
		FileUtil.makeDirectories(toPath);

		ZipFile zipFile 			= null;
        FileOutputStream fos 		= null;
        ByteArrayOutputStream baos 	= null;

		try {
            zipFile 		= new ZipFile(fromFile);
            Enumeration e 	= zipFile.entries();

            while( e.hasMoreElements() ) {
                ZipEntry zipEntry 	= (ZipEntry)e.nextElement();
                String strEntry 	= zipEntry.getName();
                int startIndex 		= 0;
                int endIndex 		= 0;
                boolean isDirectory = false;

                // Directory가 있을경우 생성함.
                while(true) {
                    endIndex = strEntry.indexOf("/", startIndex);

                    if(endIndex != -1 ) {
                        String strDirectory	= strEntry.substring(0, endIndex);
                        File fileDirectory 	= new File(toPath + strDirectory);

                        if( fileDirectory.exists() == false ) {
                            fileDirectory.mkdir();
                        }
                        startIndex = endIndex+1;
                    } else {
                        break;
                    }

                    if( endIndex+1 == strEntry.length() ) {
                        isDirectory = true;
                    }
                }

                // Directory가 아니면 파일생성.
                if( isDirectory == false ) {
                    InputStream is = zipFile.getInputStream(zipFile.getEntry(strEntry));
                    baos = new ByteArrayOutputStream();

                    byte[] byteBuffer = new byte[1024];
                    byte[] byteData = null;
                    int nLength = 0;

                    while ((nLength=is.read(byteBuffer)) > 0 ) {
                        baos.write(byteBuffer, 0, nLength);
                    }
                    is.close();

                    byteData = baos.toByteArray();
                    fos = new FileOutputStream(toPath + strEntry);
                    fos.write(byteData);

                }
            }
        } catch(IOException e) {
        	e.printStackTrace();
        } finally {
            if( zipFile != null ) {
            	try {
					zipFile.close();
					zipFile = null;
					baos.close();
					fos.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }
        }
	}

    /**
     * Zip 압축파일 풀기
     * [UNIX, LINUX 명령어로 압축풀기용]
     * ntarget - 2011-03-04
     * @param string
     * @param dmMonthPath
     */
	public static void unzipFileCmd(String fromFile, String toPath) {
		String cmd = "";

		//디렉토리 생성
		FileUtil.makeDirectories(toPath);

		if (!"".equals(toPath)) {
			cmd = "unzip -o "+ fromFile + " -d " + toPath;
		} else {
			cmd	= "unzip -o "+ fromFile;
		}

		try {
			Runtime rt = Runtime.getRuntime();
			Process procs = rt.exec(cmd);
			procs.waitFor();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
